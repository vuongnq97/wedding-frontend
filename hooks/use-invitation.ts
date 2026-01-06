'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useInvitationStore } from '@/stores/invitation-store';
import { useRouter } from '@/i18n/routing';
import { createWeddingService } from '@/services/wedding-service';
import { useAuthStore } from '@/stores/auth-store';

interface UseInvitationOptions {
  enableFetch?: boolean;
  slug?: string;
  isEdit?: boolean;
  userId?: string;
}

export const useInvitation = ({
  enableFetch = false,
  slug,
  isEdit = false,
  userId,
}: UseInvitationOptions = {}) => {
  const router = useRouter();
  const { data, updateField, reset, setData } = useInvitationStore();

  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [loading, setLoading] = useState(enableFetch);
  const [error, setError] = useState<string | null>(null);
  const { setHasWedding } = useAuthStore();

  const weddingService = useMemo(() => createWeddingService(), []);

  const fetchData = useCallback(async () => {
    if (!enableFetch) return;

    if (!slug && !isEdit) {
      return;
    }

    if (isEdit && !userId) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let response;
      if (isEdit && userId) {
        response = await weddingService.getWeddingByUserId(userId);
      } else if (slug) {
        response = await weddingService.getWeddingBySlug(slug);
      }

      if (response?.data) {
        setData(response.data);
      } else if (slug || (isEdit && userId)) {
        setError('Invitation not found');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load invitation');
    } finally {
      setLoading(false);
    }
  }, [enableFetch, slug, isEdit, userId, weddingService, setData]);

  useEffect(() => {
    if (enableFetch) {
      fetchData();
    }
  }, [enableFetch, fetchData]);

  const saveInvitation = async () => {
    setIsSaving(true);
    try {
      if (!data) return false;
      const response = data.id
        ? await weddingService.updateWedding(data)
        : await weddingService.createWedding(data);

      if (response.data) {
        setData(response.data);
      }

      return true;
    } catch (error) {
      console.error('Failed to save invitation:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const publishInvitation = async () => {
    setIsPublishing(true);
    try {
      if (!data) return false;
      data.templateCode = 'template-01';
      const response = data.id
        ? await weddingService.updateWedding(data)
        : await weddingService.createWedding(data);

      // Navigate to public page
      if (response.data) {
        setHasWedding(true);
        setData({ ...data, slug: response.data.slug, id: response.data.id });
        router.push(`/invitation/${response.data.slug}`);
      }

      return true;
    } catch (error) {
      console.error('Failed to publish invitation:', error);
      return false;
    } finally {
      setIsPublishing(false);
    }
  };

  const checkValidInvitation = () => {
    if (!data) return false;

    // General
    if (!data.heroBannerUrl) return false;

    // Groom
    if (
      !data.groom?.fullName ||
      !data.groom?.birthOrder ||
      !data.groom?.fatherName ||
      !data.groom?.motherName ||
      !data.groom?.address
    )
      return false;

    // Bride
    if (
      !data.bride?.fullName ||
      !data.bride?.birthOrder ||
      !data.bride?.fatherName ||
      !data.bride?.motherName ||
      !data.bride?.address
    )
      return false;

    // Notification
    if (!data.notification?.line1 || !data.notification?.line2) return false;

    // Reception
    if (
      !data.reception?.date ||
      !data.reception?.time ||
      !data.reception?.address
    )
      return false;

    // Ceremony (Optional)
    if (data.ceremony.show) {
      if (!data.ceremony.date || !data.ceremony.time) return false;
    }

    // // Map
    // if (
    //   !data.map?.locationName ||
    //   !data.map?.locationAddress ||
    //   !data.map?.latitude ||
    //   !data.map?.longitude
    // )
    //   return false;

    // Milestones
    if (!data.milestones || data.milestones?.length === 0) return false;

    // Album Photos
    if (!data.albumPhotos || data.albumPhotos?.length === 0) return false;

    // Music (Optional)
    if (data.music?.enabled) {
      if (!data.music?.url || !data.music?.name) return false;
    }

    return true;
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const response = await weddingService.uploadPhoto(file, 'gallery');
      if (response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Failed to upload image:', error);
      return null;
    }
  };

  const uploadMusic = async (file: File): Promise<string | null> => {
    try {
      const response = await weddingService.uploadMusic(file);
      if (response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Failed to upload music:', error);
      return null;
    }
  };

  const checkUserHasWedding = async (userId: string) => {
    try {
      const response = await weddingService.getWeddingByUserId(userId);
      const hasWedding = !!response.data;
      return hasWedding;
    } catch (error: unknown) {
      if (
        (error as { response?: { status: number } })?.response?.status ===
          404 ||
        (error as { status?: number })?.status === 404
      ) {
        return false;
      }
      console.error('Failed to check wedding status:', error);
      return false;
    }
  };

  return {
    data,
    loading,
    error,
    isLoading: !data && enableFetch,
    isSaving,
    isPublishing,
    isValid: useMemo(checkValidInvitation, [data]),
    updateField,
    saveInvitation,
    publishInvitation,
    uploadImage,
    uploadMusic,
    reset,
    setData,
    refetch: fetchData,
    checkUserHasWedding,
  };
};

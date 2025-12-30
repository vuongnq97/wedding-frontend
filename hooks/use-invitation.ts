import { useState } from 'react';
import { useInvitationStore } from '@/stores/invitation-store';
import { ROUTES } from '@/constants/routes';
import { useRouter } from '@/i18n/routing';
import { WeddingData } from '@/types/invitation';
import { useEffect } from 'react';

export const useInvitation = (initialData?: WeddingData) => {
  const router = useRouter();
  const { data, updateField, reset, setData } = useInvitationStore();
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData, setData]);

  const saveInvitation = async () => {
    setIsSaving(true);
    try {
      // Mock API call to save data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Saved invitation data:', data);

      // Navigate to preview or show success message
      router.push(ROUTES.INVITATION);
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
      // Mock API call to publish
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Published invitation:', data);

      // Navigate to public page
      router.push('/invitation');
      return true;
    } catch (error) {
      console.error('Failed to publish invitation:', error);
      return false;
    } finally {
      setIsPublishing(false);
    }
  };

  const checkValidInvitation = () => {
    // General
    if (!data.heroBannerUrl) return false;

    // Groom
    if (
      !data.groom.fullName ||
      !data.groom.birthOrder ||
      !data.groom.fatherName ||
      !data.groom.motherName ||
      !data.groom.address
    )
      return false;

    // Bride
    if (
      !data.bride.fullName ||
      !data.bride.birthOrder ||
      !data.bride.fatherName ||
      !data.bride.motherName ||
      !data.bride.address
    )
      return false;

    // Notification
    if (!data.notification.line1 || !data.notification.line2) return false;

    // Reception
    if (!data.reception.date || !data.reception.time || !data.reception.address)
      return false;

    // Ceremony (Optional)
    if (data.ceremony.show) {
      if (!data.ceremony.date || !data.ceremony.time) return false;
    }

    // Map (Optional)
    // if (data.map.show) {
    //     if (!data.map.locationName || !data.map.locationAddress) return false;
    // }
    // Milestones
    if (!data.milestones || data.milestones.length === 0) return false;

    // Album Photos
    if (!data.albumPhotos || data.albumPhotos.length === 0) return false;

    // Music (Optional)
    if (data.music.enabled) {
      if (!data.music.url || !data.music.name) return false;
    }

    return true;
  };

  const isValid = checkValidInvitation();

  return {
    data,
    updateField,
    reset,
    setData,
    saveInvitation,
    publishInvitation,
    isSaving,
    isPublishing,
    isValid,
  };
};

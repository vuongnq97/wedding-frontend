import { useState, useMemo, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  rsvpSchema,
  RsvpFormValues,
  RsvpData,
  AttendingStatus,
} from '@/types/rsvp';
import { createRsvpService } from '@/services/rsvp-service';
import { useRsvpStore } from '@/stores/rsvp-store';

export const useRsvp = (props?: { slug?: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { triggerFetch } = useRsvpStore();

  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      attending: AttendingStatus.YES,
      guests: 1,
      message: '',
    },
  });

  const rsvpService = useMemo(() => createRsvpService(), []);

  useEffect(() => {
    if (props?.slug) {
      const isSubmitted = localStorage.getItem(`rsvp-success-${props.slug}`);
      if (isSubmitted) {
        setIsSuccess(true);
      }
    }
  }, [props?.slug]);

  const onSubmit = async (data: RsvpFormValues) => {
    if (!props?.slug) {
      console.error('Wedding slug is missing');
      return;
    }

    setIsSubmitting(true);
    try {
      await rsvpService.submitRsvp({ ...data, slug: props.slug });
      localStorage.setItem(`rsvp-success-${props.slug}`, 'true');
      setIsSuccess(true);
      triggerFetch();
      form.reset();
    } catch (error) {
      console.error('Error submitting RSVP:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [wishes, setWishes] = useState<RsvpData[]>([]);

  const fetchData = useCallback(
    async (weddingId: string) => {
      try {
        const response = await rsvpService.getRsvpsByWeddingId(weddingId);
        if (response.data) {
          setWishes(response.data);
        }
      } catch (error) {
        console.error('Error fetching wishes:', error);
      }
    },
    [rsvpService]
  );

  return {
    form,
    isSubmitting,
    isSuccess,
    wishes,
    onSubmit,
    fetchData,
  };
};

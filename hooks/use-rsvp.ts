import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { rsvpSchema, RsvpFormValues, RsvpData } from '@/types/rsvp';

export const useRsvp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      attending: 'yes',
      guests: 1,
      message: '',
    },
  });

  const onSubmit = async (data: RsvpFormValues) => {
    console.log('RSVP Data:', data);

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error('Error submitting RSVP:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [wishes, setWishes] = useState<RsvpData[]>([]);

  const fetchData = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockData: RsvpData[] = [
        {
          id: '1',
          invitationId: 'demo',
          createdAt: new Date().toISOString(),
          fullName: 'Nguyễn Văn A',
          attending: 'yes',
          guests: 2,
          message: 'Chúc mừng hạnh phúc hai bạn! Trăm năm hạnh phúc nhé.',
        },
        {
          id: '2',
          invitationId: 'demo',
          createdAt: new Date().toISOString(),
          fullName: 'Trần Thị B',
          attending: 'yes',
          guests: 1,
          message: 'Happy Wedding! Chúc hai bạn sớm có tin vui.',
        },
        {
          id: '3',
          invitationId: 'demo',
          createdAt: new Date().toISOString(),
          fullName: 'Lê Văn C',
          attending: 'no',
          guests: 0,
          message: 'Tiếc quá không tham dự được, chúc hai bạn hạnh phúc!',
        },
        {
          id: '4',
          invitationId: 'demo',
          createdAt: new Date().toISOString(),
          fullName: 'Nguyễn Văn D',
          attending: 'yes',
          guests: 2,
          message: 'Chúc mừng hạnh phúc hai bạn! Trăm năm hạnh phúc nhé.',
        },
        {
          id: '5',
          invitationId: 'demo',
          createdAt: new Date().toISOString(),
          fullName: 'Trần Thị E',
          attending: 'yes',
          guests: 1,
          message: 'Happy Wedding! Chúc hai bạn sớm có tin vui.',
        },
        {
          id: '6',
          invitationId: 'demo',
          createdAt: new Date().toISOString(),
          fullName: 'Lê Văn F',
          attending: 'no',
          guests: 0,
          message: 'Tiếc quá không tham dự được, chúc hai bạn hạnh phúc!',
        },
        {
          id: '7',
          invitationId: 'demo',
          createdAt: new Date().toISOString(),
          fullName: 'Nguyễn Văn G',
          attending: 'yes',
          guests: 2,
          message: 'Chúc mừng hạnh phúc hai bạn! Trăm năm hạnh phúc nhé.',
        },
      ];
      setWishes(mockData);
    } catch (error) {
      console.error('Error fetching wishes:', error);
    }
  };

  return {
    form,
    isSubmitting,
    isSuccess,
    wishes,
    onSubmit,
    fetchData,
  };
};

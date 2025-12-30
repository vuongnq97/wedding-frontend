import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  rsvpSchema,
  RsvpFormValues,
  RsvpData,
  AttendingStatus,
} from '@/types/rsvp';

export const useRsvp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const fetchData = async (locale: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const generateMockData = (count: number, isVi: boolean): RsvpData[] => {
        const items: RsvpData[] = [];
        const statuses = [
          AttendingStatus.YES,
          AttendingStatus.NO,
          AttendingStatus.PENDING,
        ];
        const firstNames = isVi
          ? [
              'Nguyễn',
              'Trần',
              'Lê',
              'Phạm',
              'Hoàng',
              'Phan',
              'Vũ',
              'Đặng',
              'Bùi',
              'Đỗ',
            ]
          : [
              'Michael',
              'Sarah',
              'Emma',
              'David',
              'Amanda',
              'James',
              'Maria',
              'Robert',
              'Linda',
              'William',
            ];
        const lastNames = isVi
          ? [
              'Văn A',
              'Thị B',
              'Văn C',
              'Thị D',
              'Văn E',
              'Thị F',
              'Văn G',
              'Thị H',
              'Văn I',
              'Thị K',
            ]
          : [
              'Chen',
              'Wilson',
              'Roberts',
              'Kim',
              'Lewis',
              'Smith',
              'Garcia',
              'Johnson',
              'Williams',
              'Brown',
            ];

        for (let i = 1; i <= count; i++) {
          const statusIndex = i % 3;
          const status = statuses[statusIndex];
          let guests = 0;
          if (status === AttendingStatus.YES) {
            guests = (i % 4) + 1;
          }

          items.push({
            id: i.toString(),
            invitationId: 'demo',
            createdAt: new Date(Date.now() - i * 3600000).toISOString(),
            fullName: isVi
              ? `${firstNames[i % 10]} ${lastNames[i % 10]}`
              : `${firstNames[i % 10]} ${lastNames[(i + 5) % 10]}`,
            attending: status,
            guests,
            message:
              i % 7 === 0
                ? isVi
                  ? 'Chúc mừng hạnh phúc hai bạn!'
                  : 'Wishing you both a lifetime of love and happiness!'
                : undefined,
          });
        }
        return items;
      };

      setWishes(generateMockData(100, locale === 'vi'));
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

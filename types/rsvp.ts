import { z } from 'zod';

export enum AttendingStatus {
  YES = 'yes',
  NO = 'no',
  PENDING = 'pending',
}

export const rsvpSchema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  attending: z.nativeEnum(AttendingStatus),
  guests: z
    .number()
    .min(1, { message: 'Number must be greater than or equal to 1' })
    .max(10)
    .default(1),
  message: z.string().optional(),
});

export type RsvpFormValues = z.infer<typeof rsvpSchema>;

export interface CreateRsvpRequest extends RsvpFormValues {
  slug: string;
}

export interface RsvpData extends RsvpFormValues {
  id: string;
  slug: string;
  createdAt: string;
}

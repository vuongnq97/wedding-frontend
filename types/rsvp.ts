import { z } from 'zod';

export enum AttendingStatus {
  YES = 'yes',
  NO = 'no',
  PENDING = 'pending',
}

export const rsvpSchema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  attending: z.nativeEnum(AttendingStatus),
  guests: z.number().min(0).max(10).default(1),
  message: z.string().optional(),
});

export type RsvpFormValues = z.infer<typeof rsvpSchema>;

export interface RsvpData extends RsvpFormValues {
  id: string;
  invitationId: string;
  createdAt: string;
}

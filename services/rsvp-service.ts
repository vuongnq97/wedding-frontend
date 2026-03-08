import { createBaseService } from '@/services/base-service';
import { BaseServiceOptions } from '@/types/api';
import { ApiResponse } from '@/types/common';
import { RsvpData, CreateRsvpRequest } from '@/types/rsvp';

const RSVP_PATH = '/rsvp';

export type RsvpService = {
  submitRsvp: (data: CreateRsvpRequest) => Promise<ApiResponse<unknown>>;
  getRsvpsByWeddingId: (weddingId: string) => Promise<ApiResponse<RsvpData[]>>;
};

export function createRsvpService({
  client,
  ...clientOptions
}: BaseServiceOptions = {}): RsvpService {
  const baseService = createBaseService({
    client,
    ...clientOptions,
  });

  const submitRsvp = async (data: CreateRsvpRequest) => {
    return baseService.post<ApiResponse<unknown>>(RSVP_PATH, data);
  };

  const getRsvpsByWeddingId = async (weddingId: string) => {
    return baseService.get<ApiResponse<RsvpData[]>>(
      `${RSVP_PATH}/wedding/${weddingId}`
    );
  };

  return {
    submitRsvp,
    getRsvpsByWeddingId,
  };
}

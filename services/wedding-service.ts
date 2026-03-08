import { createBaseService } from '@/services/base-service';
import { BaseServiceOptions } from '@/types/api';
import { ApiResponse } from '@/types/common';
import { Wedding } from '@/types/invitation';

const UPLOAD_PHOTO_PATH = '/Upload/photo';
const UPLOAD_MUSIC_PATH = '/Upload/music';
const WEDDING_PATH = '/wedding';

export type WeddingService = {
  uploadPhoto: (file: File, imageType: string) => Promise<ApiResponse<string>>;
  uploadMusic: (file: File) => Promise<ApiResponse<string>>;
  createWedding: (data: Wedding) => Promise<ApiResponse<Wedding>>;
  getWeddingBySlug: (slug: string) => Promise<ApiResponse<Wedding>>;
  getWeddingByUserId: (userId: string) => Promise<ApiResponse<Wedding>>;
  updateWedding: (data: Wedding) => Promise<ApiResponse<Wedding>>;
};

type UploadSasResponse = {
  uploadUrl: string;
  blobUrl: string;
};

export function createWeddingService({
  client,
  ...clientOptions
}: BaseServiceOptions = {}): WeddingService {
  const baseService = createBaseService({
    client,
    ...clientOptions,
  });

  const uploadFile = async (
    path: string,
    file: File,
    metadata?: Record<string, string>
  ) => {
    // 1. Get signed upload URL from backend
    const { data: sasData } = await baseService.post<
      ApiResponse<UploadSasResponse>
    >(path, {
      fileName: file.name,
      contentType: file.type,
      ...metadata,
    });

    if (!sasData?.uploadUrl) {
      throw new Error('Failed to get upload URL');
    }

    // 2. Upload directly to Supabase Storage
    const uploadResponse = await fetch(sasData.uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed with status ${uploadResponse.status}`);
    }

    return {
      code: 200,
      message: 'Success',
      data: sasData.blobUrl,
      errorCode: null,
    };
  };

  const uploadPhoto = (file: File, imageType: string) =>
    uploadFile(UPLOAD_PHOTO_PATH, file, { imageType });

  const uploadMusic = (file: File) => uploadFile(UPLOAD_MUSIC_PATH, file);

  const createWedding = async (data: Wedding) => {
    return baseService.post<ApiResponse<Wedding>>(WEDDING_PATH, data);
  };

  const getWeddingBySlug = async (slug: string) => {
    return baseService.get<ApiResponse<Wedding>>(`${WEDDING_PATH}/${slug}`);
  };

  const getWeddingByUserId = async (userId: string) => {
    return baseService.get<ApiResponse<Wedding>>(
      `${WEDDING_PATH}/my/${userId}`
    );
  };

  const updateWedding = async (data: Wedding) => {
    return baseService.put<ApiResponse<Wedding>>(WEDDING_PATH, data);
  };

  return {
    uploadPhoto,
    uploadMusic,
    createWedding,
    getWeddingBySlug,
    getWeddingByUserId,
    updateWedding,
  };
}

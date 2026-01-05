export interface Milestone {
  id?: string;
  date: string;
  title: string;
  description: string;
  photoUrl?: string;
}

export interface BankAccount {
  id?: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  owner?: number; // 0 for Groom, 1 for Bride
}

export type Wedding = {
  id?: string;
  ownerUserId?: string;
  slug?: string;
  heroBannerUrl?: string;
  templateCode?: string;
  groom: {
    fullName: string;
    informalName: string;
    fatherName: string;
    motherName: string;
    birthOrder: string;
    address: string;
    photoUrl?: string;
  };
  bride: {
    fullName: string;
    informalName: string;
    fatherName: string;
    motherName: string;
    birthOrder: string;
    address: string;
    photoUrl?: string;
  };
  milestones: Milestone[];
  albumPhotos: {
    url: string;
  }[];
  notification: {
    line1: string;
    line2: string;
  };
  ceremony: {
    show: boolean;
    date: Date;
    time: string;
  };
  reception: {
    date: Date;
    time: string;
    address: string;
  };
  map: {
    show: boolean;
    link: string;
    locationName: string;
    locationAddress: string;
    latitude: number;
    longitude: number;
  };
  thankYouMessage: string;
  guestbookEnabled: boolean;
  bankAccounts: BankAccount[];
  music: {
    enabled: boolean;
    url: string;
    name: string;
  };
  showAds: boolean;
  createdAt?: string;
};

// Alias for backward compatibility if needed during refactor, strictly we should use Wedding
export type WeddingData = Wedding;

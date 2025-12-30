export interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  photoUrl?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface WeddingData {
  heroBannerUrl?: string;
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
  albumPhotos: string[];
  notification: {
    line1: string;
    line2: string;
  };
  ceremony: {
    show: boolean;
    date: string;
    time: string;
  };
  reception: {
    date: string;
    time: string;
    address: string;
  };
  map: {
    show: boolean;
    link: string; // Keep for legacy or iframe fallback
    locationName: string;
    locationAddress: string;
    coords?: {
      lat: number;
      lng: number;
    };
  };
  thankYouMessage: string;
  guestbookEnabled: boolean;
  bankAccounts: {
    groom: BankAccount[];
    bride: BankAccount[];
  };
  music: {
    enabled: boolean;
    url: string;
    name: string;
  };
  showAds: boolean;
}

export interface DashboardStat {
  label: string;
  value: string | number;
  iconName: string;
  footerText?: string;
  color?: string;
}

export interface InvitationSummary {
  title: string;
  status: 'live' | 'draft' | 'archived';
  templateName: string;
  lastEdited: string;
  link: string;
}

export interface UserProfile {
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  status: 'attending' | 'not_attending' | 'pending' | 'declined';
  groupSize: {
    adults: number;
    children: number;
  };
  note?: string;
  avatarUrl?: string;
}

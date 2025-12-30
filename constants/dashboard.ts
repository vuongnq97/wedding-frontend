import { InvitationSummary, UserProfile, Guest } from '@/types/dashboard';

export const MOCK_USER: UserProfile = {
  name: 'Sarah & Michael',
  role: 'Bride & Groom',
  avatarUrl:
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=100&h=100&auto=format&fit=crop',
};

export const MOCK_INVITATION: InvitationSummary = {
  title: 'Sarah Michael Wedding',
  status: 'live',
  templateName: 'floralElegance',
  lastEdited: 'lastEdited2HoursAgo',
  link: 'https://wedding.io/sarah-michael',
};

export const MOCK_GUESTS: Guest[] = [];

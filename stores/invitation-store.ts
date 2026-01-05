import { create } from 'zustand';
import { WeddingData } from '@/types/invitation';

interface InvitationState {
  data: WeddingData | null;
  setData: (data: WeddingData) => void;
  updateField: (path: (string | number)[], value: unknown) => void;
  reset: () => void;
}

// const INITIAL_DATA: WeddingData = {
//   heroBannerUrl: '',
//   templateCode: 'TEMPLATE_01',
//   groom: {
//     fullName: '',
//     informalName: '',
//     fatherName: '',
//     motherName: '',
//     address: '',
//     photoUrl: '',
//     birthOrder: '',
//   },
//   bride: {
//     fullName: '',
//     informalName: '',
//     fatherName: '',
//     motherName: '',
//     address: '',
//     photoUrl: '',
//     birthOrder: '',
//   },
//   milestones: [
//     {
//       id: '1',
//       date: '2018-06-15',
//       title: 'First Meeting',
//       description: 'We met at a lovely coffee shop downtown...',
//     },
//   ],
//   albumPhotos: [
//     {
//       url: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     },
//     {
//       url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoVkBwzs-UIXq4jXWV15PJ738VcK4w9ftvDnL6L1lYkE14YGbdG6AK-4CzhvPRPORNYNJ_-U_NBYxFxZzcPLXKkaF4gH8B4J7K4ADS2Vm7wEkpQHLULy2k8LF0aLp9-hOf-dQbUuS2uHjhx4Yqv69-JUMPIVSnMxWH_g3A5ct-T27ZlVQo08eBtwT0EBHa0jNi5jERL5SbWzoK40brllJtcV3Uc3KkzKQffS-CnhI9e_zLZuT-51K1dWMVG75zU6RG5ffOOlAbbmQ',
//     },
//     {
//       url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa47d2YLZ7Q_HQk87h3uEUxwmpqkhW6e2U9oI2XeQarpfcGGwArBxqKkfDxPdyD5WXqdfIZHH0XvF38DEOV2-_dbycHKID5UbzJfvP2JLwOrQ5Ytxq3B74mMrZXk_g_FsTALtmkNXRY8RBxeHPZzQDl1W53JTLiICRgUTU-VjaYU8LjcPquOlchoUiAl0DoT5FGAh55ARblxJ77p_Evyf1hP8i_D9zP0HnUSqxYL0hStXSAk3BMvk68xApx439ARRq9ohX7inUW38',
//     },
//   ],
//   notification: {
//     line1: 'We are getting married',
//     line2: 'Save the Date',
//   },
//   ceremony: {
//     show: true,
//     date: new Date(),
//     time: '17:00',
//   },
//   reception: {
//     date: new Date(),
//     time: '18:00',
//     address: '',
//   },
//   map: {
//     show: true,
//     link: '',
//     locationName: 'The Botanical Gardens',
//     locationAddress: '123 Garden Lane, New York',
//     latitude: 0,
//     longitude: 0,
//   },
//   thankYouMessage: 'We are so excited to celebrate with you!',
//   guestbookEnabled: true,
//   bankAccounts: [],
//   music: {
//     enabled: false,
//     url: '',
//     name: '',
//   },
//   showAds: true,
// };

export const useInvitationStore = create<InvitationState>((set) => ({
  data: null,
  setData: (data) => set({ data }),
  updateField: (path, value) =>
    set((state) => {
      const newData = { ...state.data };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let current: any = newData;
      for (let i = 0; i < path.length - 1; i++) {
        // Create nested object if it doesn't exist (though strictly mostly should)
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return { data: newData as WeddingData };
    }),
  reset: () => set({ data: null }),
}));

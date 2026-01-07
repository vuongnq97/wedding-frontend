import { WeddingData } from '@/types/invitation';

export const invitationTemplatePageEn: WeddingData = {
  heroBannerUrl:
    'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  groom: {
    fullName: 'Alexander James Smith',
    informalName: 'Alex',
    fatherName: 'Robert Smith',
    motherName: 'Mary Smith',
    birthOrder: 'Eldest Son',
    address: '123 Pine St, Seattle, WA',
    photoUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  },
  bride: {
    fullName: 'Isabella Marie Johnson',
    informalName: 'Bella',
    fatherName: 'David Johnson',
    motherName: 'Sarah Johnson',
    birthOrder: 'Youngest Daughter',
    address: '456 Oak Ave, Portland, OR',
    photoUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  },
  milestones: [
    {
      id: '1',
      date: '2018-06-15',
      title: 'First Meeting',
      description:
        'We met at a lovely coffee shop downtown and talked for hours.',
      photoUrl:
        'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      date: '2019-12-24',
      title: 'First Date',
      description:
        'Our first official date was a magical Christmas Eve dinner.',
      photoUrl:
        'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '3',
      date: '2023-01-01',
      title: 'She Said Yes!',
      description: "Alex proposed under the fireworks on New Year's Eve.",
      photoUrl:
        'https://joliemai.com/wp-content/uploads/2023/12/Trang-tri-tiec-cau-hon-030.jpg',
    },
  ],
  albumPhotos: [
    {
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      url: 'https://tuarts.net/wp-content/uploads/2021/04/323427669_1215565176029190_7406930290556536431_n.jpg',
    },
  ],
  notification: {
    line1: 'Together with their families',
    line2: 'Joyfully invite you to celebrate their wedding',
  },
  ceremony: {
    show: true,
    date: new Date('2026-03-15'),
    time: '14:00',
  },
  reception: {
    date: new Date('2026-03-15'),
    time: '17:00',
    address: 'The Grand Ballroom, 789 Luxury Ln, Seattle, WA',
  },
  map: {
    show: true,
    link: 'https://goo.gl/maps/example',
    locationName: 'The Grand Ballroom',
    locationAddress: '789 Luxury Ln, Seattle, WA',
    latitude: 47.6062,
    longitude: -122.3321,
  },
  thankYouMessage: 'We are so excited to celebrate our special day with you!',
  guestbookEnabled: true,
  bankAccounts: [
    {
      id: '1',
      bankName: 'Chase Bank',
      accountNumber: '1234567890',
      accountHolder: 'Alexander Smith',
      owner: 0,
    },
    {
      id: '1',
      bankName: 'Bank of America',
      accountNumber: '0987654321',
      accountHolder: 'Isabella Johnson',
      owner: 1,
    },
  ],
  music: {
    enabled: true,
    url: 'https://www.mfiles.co.uk/mp3-downloads/pachelbel-canon-in-d.mp3',
    name: 'Canon in D',
  },
  showLoveStory: true,
  showAds: true,
};

export const invitationTemplatePageVi: WeddingData = {
  heroBannerUrl:
    'https://aodaitailoc.com/wp-content/uploads/2020/08/chup-anh-cuoi-da-lat-1024x684.jpg',
  groom: {
    fullName: 'Nguyễn Văn Nam',
    informalName: 'Nam',
    fatherName: 'Nguyễn Văn Hùng',
    motherName: 'Trần Thị Mai',
    birthOrder: 'Trưởng Nam',
    address: '123 Đường Láng, Hà Nội',
    photoUrl:
      'https://umvestnam.com/images/stories/virtuemart/product/resized/bo-vest-nam-den-tuyen-3_700x700.jpg',
  },
  bride: {
    fullName: 'Lê Thị Lan',
    informalName: 'Lan',
    fatherName: 'Lê Văn Dũng',
    motherName: 'Phạm Thị Hương',
    birthOrder: 'Út Nữ',
    address: '456 Cầu Giấy, Hà Nội',
    photoUrl:
      'https://kalina.com.vn/wp-content/uploads/2022/07/trang-diem-co-dau-mat-mun.jpg',
  },
  milestones: [
    {
      id: '1',
      date: '15/06/2018',
      title: 'Lần Đầu Gặp Gỡ',
      description:
        'Chúng mình gặp nhau tại một quán cà phê nhỏ và trò chuyện suốt hàng giờ liền.',
      photoUrl:
        'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      date: '24/12/2019',
      title: 'Hẹn Hò Đầu Tiên',
      description:
        'Buổi hẹn hò chính thức đầu tiên là một bữa tối Giáng sinh ấm áp.',
      photoUrl:
        'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '3',
      date: '01/01/2023',
      title: 'Lời Cầu Hôn',
      description: 'Nam đã cầu hôn Lan dưới pháo hoa đêm giao thừa.',
      photoUrl:
        'https://joliemai.com/wp-content/uploads/2023/12/Trang-tri-tiec-cau-hon-030.jpg',
    },
  ],
  albumPhotos: [
    {
      url: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/03/anh-cuoi-5.jpg',
    },
    {
      url: 'https://cdn-media.sforum.vn/storage/app/media/thanhhuyen/%E1%BA%A3nh%20c%C6%B0%E1%BB%9Bi/1/anh-cuoi-1.jpg',
    },
    {
      url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ],
  notification: {
    line1: 'Trân trọng kính mời quý khách',
    line2: 'Đến dự bữa tiệc chung vui cùng gia đình chúng tôi',
  },
  ceremony: {
    show: true,
    date: new Date('2026-03-15'),
    time: '14:00',
  },
  reception: {
    date: new Date('2026-03-15'),
    time: '17:00',
    address: 'Trung tâm Tiệc cưới Hoàng Gia, 789 Đường Láng, Hà Nội',
  },
  map: {
    show: true,
    link: 'https://goo.gl/maps/example',
    locationName: 'Trung tâm Tiệc cưới Hoàng Gia',
    locationAddress: '789 Đường Láng, Hà Nội',
    latitude: 21.0285,
    longitude: 105.8542,
  },
  thankYouMessage: 'Rất hân hạnh được đón tiếp quý khách!',
  guestbookEnabled: true,
  bankAccounts: [
    {
      id: '1',
      bankName: 'Vietcombank',
      accountNumber: '1234567890',
      accountHolder: 'Nguyễn Văn Nam',
      owner: 0,
    },
    {
      id: '1',
      bankName: 'Techcombank',
      accountNumber: '0987654321',
      accountHolder: 'Lê Thị Lan',
      owner: 1,
    },
  ],
  music: {
    enabled: true,
    url: 'https://www.mfiles.co.uk/mp3-downloads/pachelbel-canon-in-d.mp3',
    name: 'Canon in D',
  },
  showLoveStory: true,
  showAds: true,
};

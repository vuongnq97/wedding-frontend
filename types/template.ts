export interface Template {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  isNew?: boolean;
  isPopular?: boolean;
  tags?: string[];
  isComingSoon?: boolean;
  mainColor?: string;
}

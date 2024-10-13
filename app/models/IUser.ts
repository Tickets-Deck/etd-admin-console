type UserMetrics = {
    events: number;
}

export type User = {
  id: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  username: string | null;
  profilePhoto: string;
  profilePhotoId: string | null;
  coverPhoto: string | null;
  coverPhotoId: string | null;
  phone: string | null;
  occupation: string | null;
  bio: string | null;
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  followersCount: number;
  followingCount: number;
  eventsCount: number;
  bookmarksCount: number;
  favoritesCount: number;
  isVerified: boolean;
  isBlocked: boolean;
  isSuspended: boolean;
  isDeleted: boolean;
  isSuperAdmin: boolean;
  isSubscribed: boolean;
  isNewsletterSubscribed: boolean;
  ticketsBought: number;
  ticketsSold: number;
  totalRevenue: string;
  createdAt: string;
  updatedAt: string;
  _count: UserMetrics
};
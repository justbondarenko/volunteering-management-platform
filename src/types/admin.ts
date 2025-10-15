export interface UserProfileAdmin {
  id: string;
  name: string;
  email: string;
  role: 'User' | 'Admin' | 'Org Rep';
  status: 'Active' | 'Blocked';
  createdAt: string; // ISO
  updatedAt?: string; // ISO
  phone?: string;
  bio?: string;
}

export interface OrganizationApplication {
  id: string;
  organizationName: string;
  applicantName: string;
  submittedAt: string; // ISO
  status: 'Pending' | 'Approved' | 'Rejected';
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  legalName?: string;
  rejectionReason?: string;
  decidedAt?: string;
}

export interface AdminEvent {
  id: string;
  title: string;
  creatorName: string;
  createdAt: string; // ISO
  status: 'Active' | 'Reported' | 'Draft';
  city?: string;
  description?: string;
}

export interface AdminReview {
  id: string;
  content: string;
  authorName: string;
  targetType: 'Event' | 'Organization';
  targetId: string;
  reportCount?: number;
  createdAt: string; // ISO
}

export interface AdminProject {
  id: string;
  title: string;
  organizationName: string;
  submittedAt: string; // ISO
  status: 'Pending' | 'Approved' | 'Rejected' | 'Needs Info';
  city?: string;
  description?: string;
  rejectionReason?: string;
  requestMessage?: string;
  decidedAt?: string; // ISO
}

export interface DictionaryItem {
  id: string;
  name: string;
}

export interface AnalyticsKpis {
  totalUsers: number;
  newUsers30d: number;
  activeEvents: number;
  verifiedOrgs: number;
}

export interface AnalyticsSeriesPoint {
  date: string; // ISO day
  value: number;
}

export interface AnalyticsPayload {
  kpis: AnalyticsKpis;
  newUsers90d: AnalyticsSeriesPoint[];
  eventsByCity: { city: string; count: number }[];
}


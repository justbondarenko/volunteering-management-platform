export interface VolunteerEventItem {
  id: string;
  title: string;
  date: string; // ISO
  location: string; // include city
  description: string;
  status: 'open' | 'closed' | 'completed';
  volunteersNeeded: number;
  volunteersAssigned: number;
  applied?: boolean;
}

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

export interface OrganizationVolunteer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rating: number; // 1-5
  lastWorkedWith: string; // ISO date
  dateOfBirth: string; // ISO date
  address: string;
  city: string;
  projectsWithOrganization: number;
  skills: string[];
}

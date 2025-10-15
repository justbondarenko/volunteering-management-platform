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

export interface OrganizationProject {
  id: string;
  name: string;
  startDate: string; // ISO date
  endDate: string; // ISO date
  city: string;
  address: string;
  description: string;
  volunteersNeeded: number;
  volunteersSigned: number;
  signedVolunteers: string[]; // Array of volunteer IDs
  budget?: number;
  projectManager?: string;
  category?: string;
  status?: 'draft' | 'upcoming' | 'active' | 'ended' | 'cancelled'; // Computed from dates
}

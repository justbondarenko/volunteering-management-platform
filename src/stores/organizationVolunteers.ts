import { defineStore } from 'pinia';
import { z } from 'zod';
import type { OrganizationVolunteer } from '~/types';

// Define the organization volunteer schema using Zod
const organizationVolunteerSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  rating: z.number().min(1).max(5),
  lastWorkedWith: z.string(),
  dateOfBirth: z.string(),
  address: z.string(),
  city: z.string(),
  projectsWithOrganization: z.number(),
  skills: z.array(z.string())
});

// TypeScript type derived from the schema
export type OrganizationVolunteerType = z.infer<typeof organizationVolunteerSchema>;

export const useOrganizationVolunteersStore = defineStore('organizationVolunteers', () => {
  // State
  const volunteers = ref<OrganizationVolunteer[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Actions
  const fetchVolunteers = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Simulate API call with 5-second delay
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // In a real app, this would be an API call
      // const response = await $fetch('/api/organizations/volunteers');
      // volunteers.value = response;
      
      // Load mock data from JSON file
      const data = await import('~/data/organization-volunteers.json');
      
      // Validate the data using Zod schema
      const validatedData = z.array(organizationVolunteerSchema).parse(data.default);
      volunteers.value = validatedData;
      
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load volunteers';
      console.error('Error fetching organization volunteers:', err);
    } finally {
      isLoading.value = false;
    }
  };

  // Getters
  const getVolunteerById = computed(() => {
    return (id: string) => volunteers.value.find(volunteer => volunteer.id === id);
  });

  const getVolunteersCount = computed(() => {
    return volunteers.value.length;
  });

  const getAverageRating = computed(() => {
    if (volunteers.value.length === 0) return 0;
    const totalRating = volunteers.value.reduce((sum, volunteer) => sum + volunteer.rating, 0);
    return totalRating / volunteers.value.length;
  });

  const getTotalProjects = computed(() => {
    return volunteers.value.reduce((sum, volunteer) => sum + volunteer.projectsWithOrganization, 0);
  });

  return {
    // State
    volunteers,
    isLoading,
    error,
    
    // Actions
    fetchVolunteers,
    
    // Getters
    getVolunteerById,
    getVolunteersCount,
    getAverageRating,
    getTotalProjects
  };
});

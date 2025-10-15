import { defineStore } from 'pinia';
import { z } from 'zod';
import type { OrganizationProject } from '~/types';

// Define the organization project schema using Zod
const organizationProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  city: z.string(),
  address: z.string(),
  description: z.string(),
  volunteersNeeded: z.number(),
  volunteersSigned: z.number(),
  signedVolunteers: z.array(z.string()),
  budget: z.number().optional(),
  projectManager: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(['draft', 'upcoming', 'active', 'ended', 'cancelled']).optional()
});

// TypeScript type derived from the schema
export type OrganizationProjectType = z.infer<typeof organizationProjectSchema>;

export const useOrganizationProjectsStore = defineStore('organizationProjects', () => {
  // State
  const projects = ref<OrganizationProject[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Actions
  const fetchProjects = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Load mock data from JSON file
      const data = await import('~/data/organization-projects.json');
      
      // Validate the data using Zod schema
      const validatedData = z.array(organizationProjectSchema).parse(data.default);
      projects.value = validatedData;
      
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load projects';
      console.error('Error fetching organization projects:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const updateProject = (id: string, updates: Partial<OrganizationProject>) => {
    const projectIndex = projects.value.findIndex(project => project.id === id);
    if (projectIndex !== -1) {
      projects.value[projectIndex] = { ...projects.value[projectIndex], ...updates };
    }
  };

  // Getters
  const getProjectById = computed(() => {
    return (id: string) => projects.value.find(project => project.id === id);
  });

  const getProjectsByStatus = computed(() => {
    return (status: string) => projects.value.filter(project => getProjectStatus(project) === status);
  });

  const getTotalProjects = computed(() => {
    return projects.value.length;
  });

  const getActiveProjects = computed(() => {
    return projects.value.filter(project => getProjectStatus(project) === 'active').length;
  });

  const getTotalVolunteersEngaged = computed(() => {
    return projects.value.reduce((sum, project) => sum + project.volunteersSigned, 0);
  });

  // Helper function to compute project status based on dates
  const getProjectStatus = (project: OrganizationProject): 'draft' | 'upcoming' | 'active' | 'ended' | 'cancelled' => {
    // If status is manually set to draft or cancelled, return that
    if (project.status === 'draft' || project.status === 'cancelled') {
      return project.status;
    }

    const now = new Date();
    const startDate = new Date(project.startDate);
    const endDate = new Date(project.endDate);

    if (now < startDate) {
      return 'upcoming';
    } else if (now >= startDate && now <= endDate) {
      return 'active';
    } else {
      return 'ended';
    }
  };

  // Computed property for projects with computed status
  const projectsWithStatus = computed(() => {
    return projects.value.map(project => ({
      ...project,
      status: getProjectStatus(project)
    }));
  });

  return {
    // State
    projects,
    isLoading,
    error,
    
    // Actions
    fetchProjects,
    updateProject,
    
    // Getters
    getProjectById,
    getProjectsByStatus,
    getTotalProjects,
    getActiveProjects,
    getTotalVolunteersEngaged,
    projectsWithStatus,
    
    // Helper functions
    getProjectStatus
  };
});

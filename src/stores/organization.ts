import { defineStore } from 'pinia';
import { z } from 'zod';

// Define the organization schema using Zod
const organizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  city: z.string(),
  address: z.string(),
  edrpou: z.string().length(10, 'ЄДРПОУ має містити 10 цифр').regex(/^\d{10}$/, 'ЄДРПОУ має містити тільки цифри'),
  logo: z.string().nullable(),
  rating: z.number().min(0).max(5),
  categories: z.array(z.string()),
  description: z.string(),
  website: z.string().url().nullable(),
  socialLinks: z.object({
    facebook: z.string().nullable(),
    instagram: z.string().nullable(),
    twitter: z.string().nullable(),
    linkedin: z.string().nullable(),
  }),
  completedProjects: z.number(),
  activeProjects: z.number(),
  joinedDate: z.string(),
});

// TypeScript type derived from the schema
export type Organization = z.infer<typeof organizationSchema>;

// Mock organization data
const mockOrganization: Organization = {
  id: '1',
  name: 'Благодійний Фонд "Допомога"',
  email: 'organization@example.com',
  phone: '+380501234567',
  city: 'Київ',
  address: 'вул. Хрещатик, 22, офіс 301',
  edrpou: '1234567890',
  logo: null,
  rating: 4.8,
  categories: ['Гуманітарна допомога', 'Освіта', 'Медицина'],
  description: 'Благодійний фонд, що займається наданням гуманітарної допомоги, освітніми проектами та медичною підтримкою для вразливих груп населення.',
  website: 'https://example.org',
  socialLinks: {
    facebook: 'https://facebook.com/example',
    instagram: 'https://instagram.com/example',
    twitter: null,
    linkedin: 'https://linkedin.com/company/example',
  },
  completedProjects: 24,
  activeProjects: 5,
  joinedDate: '2021-05-15',
};

export const useOrganizationStore = defineStore('organization', () => {
  // State
  const organization = ref<Organization | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Actions
  const fetchOrganization = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, this would be an API call
      // const response = await $fetch('/api/organizations/profile');
      // organization.value = response;
      
      // For now, use mock data
      organization.value = { ...mockOrganization };
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load organization profile';
      console.error('Error fetching organization profile:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const updateOrganization = async (updatedData: Partial<Organization>) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Validate the updated data
      if (!organization.value) {
        throw new Error('No organization profile loaded');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call
      // const response = await $fetch('/api/organizations/profile', {
      //   method: 'PUT',
      //   body: updatedData
      // });
      
      // Update local state with the changes
      organization.value = {
        ...organization.value,
        ...updatedData,
      };
      
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update organization profile';
      console.error('Error updating organization profile:', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const uploadLogo = async (file: File) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Validate file
      if (!file) {
        throw new Error('No file provided');
      }
      
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        throw new Error('Invalid file type. Please upload a JPEG, PNG, or GIF image.');
      }
      
      // Check file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        throw new Error('File size exceeds 5MB limit.');
      }
      
      // Simulate API call for file upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would be a file upload API call
      // const formData = new FormData();
      // formData.append('logo', file);
      // const response = await $fetch('/api/organizations/profile/logo', {
      //   method: 'POST',
      //   body: formData
      // });
      
      // For now, create a data URL from the file for preview
      const reader = new FileReader();
      const logoUrl = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      
      // Update the organization logo
      if (organization.value) {
        organization.value.logo = logoUrl;
      }
      
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to upload logo';
      console.error('Error uploading logo:', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  // Getters
  const formattedJoinedDate = computed(() => {
    if (!organization.value?.joinedDate) return '';
    
    try {
      const date = new Date(organization.value.joinedDate);
      return new Intl.DateTimeFormat('uk-UA').format(date);
    } catch (e) {
      return organization.value.joinedDate;
    }
  });

  return {
    // State
    organization,
    isLoading,
    error,
    
    // Actions
    fetchOrganization,
    updateOrganization,
    uploadLogo,
    
    // Getters
    formattedJoinedDate,
  };
});

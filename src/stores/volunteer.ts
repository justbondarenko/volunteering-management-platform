import { defineStore } from 'pinia';
import { z } from 'zod';

// Define the volunteer schema using Zod
const volunteerSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  city: z.string(),
  dateOfBirth: z.string(),
  photo: z.string().nullable(),
  rating: z.number().min(0).max(5),
  skills: z.array(z.string()),
  bio: z.string(),
  completedProjects: z.number(),
  joinedDate: z.string(),
});

// TypeScript type derived from the schema
export type Volunteer = z.infer<typeof volunteerSchema>;

// Mock volunteer data
const mockVolunteer: Volunteer = {
  id: '1',
  firstName: 'Олександр',
  lastName: 'Петренко',
  email: 'volunteer@example.com',
  phone: '+380501234567',
  city: 'Київ',
  dateOfBirth: '1990-05-15',
  photo: null,
  rating: 4.5,
  skills: ['Логістика', 'Медична допомога', 'Комунікації'],
  bio: 'Активний волонтер з досвідом роботи в гуманітарних проектах. Спеціалізуюсь на координації логістики та медичній допомозі.',
  completedProjects: 12,
  joinedDate: '2022-03-01',
};

export const useVolunteerStore = defineStore('volunteer', () => {
  // State
  const volunteer = ref<Volunteer | null>(null);
  const isLoggedIn = ref(false);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Initialize login state from localStorage on client side
  const initializeAuth = () => {
    if (process.client) {
      const savedLoginState = localStorage.getItem('volunteer-logged-in');
      if (savedLoginState === 'true' && !isLoggedIn.value) {
        isLoggedIn.value = true;
        volunteer.value = { ...mockVolunteer };
      }
    }
  };

  // Initialize auth state immediately
  if (process.client) {
    initializeAuth();
  }

  // Actions
  const fetchVolunteer = async () => {
    // If user is already logged in and data is loaded, don't fetch again
    if (isLoggedIn.value && volunteer.value) {
      return;
    }

    isLoading.value = true;
    error.value = null;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, this would be an API call
      // const response = await $fetch('/api/volunteers/profile');
      // volunteer.value = response;
      
      // Only load data if user is logged in
      if (isLoggedIn.value) {
        volunteer.value = { ...mockVolunteer };
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load volunteer profile';
      console.error('Error fetching volunteer profile:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const updateVolunteer = async (updatedData: Partial<Volunteer>) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Validate the updated data
      if (!volunteer.value) {
        throw new Error('No volunteer profile loaded');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call
      // const response = await $fetch('/api/volunteers/profile', {
      //   method: 'PUT',
      //   body: updatedData
      // });
      
      // Update local state with the changes
      volunteer.value = {
        ...volunteer.value,
        ...updatedData,
      };
      
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update volunteer profile';
      console.error('Error updating volunteer profile:', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test credentials for demo purposes
      if (email === 'volunteer@example.com' && password === 'password123') {
        // Set user as logged in and load volunteer data
        volunteer.value = { ...mockVolunteer };
        isLoggedIn.value = true;
        
        // Persist login state
        if (process.client) {
          localStorage.setItem('volunteer-logged-in', 'true');
        }
        
        return true;
      } else {
        throw new Error('Невірні облікові дані');
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to login';
      console.error('Error during login:', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    volunteer.value = null;
    isLoggedIn.value = false;
    error.value = null;
    
    // Clear persisted login state
    if (process.client) {
      localStorage.removeItem('volunteer-logged-in');
    }
  };

  const uploadPhoto = async (file: File) => {
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
      // formData.append('photo', file);
      // const response = await $fetch('/api/volunteers/profile/photo', {
      //   method: 'POST',
      //   body: formData
      // });
      
      // For now, create a data URL from the file for preview
      const reader = new FileReader();
      const photoUrl = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      
      // Update the volunteer photo
      if (volunteer.value) {
        volunteer.value.photo = photoUrl;
      }
      
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to upload photo';
      console.error('Error uploading photo:', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  // Getters
  const fullName = computed(() => {
    if (!volunteer.value) return '';
    return `${volunteer.value.firstName} ${volunteer.value.lastName}`;
  });

  const formattedDateOfBirth = computed(() => {
    if (!volunteer.value?.dateOfBirth) return '';
    
    try {
      const date = new Date(volunteer.value.dateOfBirth);
      return new Intl.DateTimeFormat('uk-UA').format(date);
    } catch (e) {
      return volunteer.value.dateOfBirth;
    }
  });

  return {
    // State
    volunteer,
    isLoggedIn,
    isLoading,
    error,
    
    // Actions
    fetchVolunteer,
    updateVolunteer,
    uploadPhoto,
    login,
    logout,
    initializeAuth,
    
    // Getters
    fullName,
    formattedDateOfBirth,
  };
});

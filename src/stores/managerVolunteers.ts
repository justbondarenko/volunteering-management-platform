import { defineStore } from 'pinia';
import { loadFromStorage, saveToStorage } from '~/utils/persist';
import { z } from 'zod';
import type { Volunteer } from './volunteer';

// Define the volunteer list schema using Zod
const volunteerListSchema = z.array(
  z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    city: z.string(),
    photo: z.string().nullable(),
    rating: z.number().min(0).max(5),
    status: z.enum(['active', 'pending', 'suspended', 'inactive']),
    joinedDate: z.string(),
    completedProjects: z.number(),
    skills: z.array(z.string())
  })
);

// TypeScript type derived from the schema
export type VolunteerListItem = z.infer<typeof volunteerListSchema>[0];

// Mock volunteers data
const mockVolunteers: VolunteerListItem[] = [
  {
    id: '1',
    firstName: 'Олександр',
    lastName: 'Петренко',
    email: 'volunteer@example.com',
    phone: '+380501234567',
    city: 'Київ',
    photo: null,
    rating: 4.5,
    status: 'active',
    joinedDate: '2022-03-01',
    completedProjects: 12,
    skills: ['Логістика', 'Медична допомога', 'Комунікації']
  },
  {
    id: '2',
    firstName: 'Марія',
    lastName: 'Коваленко',
    email: 'maria@example.com',
    phone: '+380672345678',
    city: 'Львів',
    photo: null,
    rating: 4.8,
    status: 'active',
    joinedDate: '2021-11-15',
    completedProjects: 18,
    skills: ['Переклад', 'Соціальні медіа', 'Фандрейзинг']
  },
  {
    id: '3',
    firstName: 'Іван',
    lastName: 'Мельник',
    email: 'ivan@example.com',
    phone: '+380633456789',
    city: 'Одеса',
    photo: null,
    rating: 4.2,
    status: 'pending',
    joinedDate: '2022-06-10',
    completedProjects: 5,
    skills: ['Будівництво', 'Транспорт', 'Організація заходів']
  },
  {
    id: '4',
    firstName: 'Анна',
    lastName: 'Шевченко',
    email: 'anna@example.com',
    phone: '+380994567890',
    city: 'Харків',
    photo: null,
    rating: 4.7,
    status: 'active',
    joinedDate: '2021-08-22',
    completedProjects: 15,
    skills: ['Психологічна підтримка', 'Освіта', 'Робота з дітьми']
  },
  {
    id: '5',
    firstName: 'Максим',
    lastName: 'Бондаренко',
    email: 'maxim@example.com',
    phone: '+380505678901',
    city: 'Дніпро',
    photo: null,
    rating: 4.0,
    status: 'suspended',
    joinedDate: '2022-01-30',
    completedProjects: 7,
    skills: ['IT підтримка', 'Технічна допомога', 'Веб-розробка']
  },
  {
    id: '6',
    firstName: 'Юлія',
    lastName: 'Ткаченко',
    email: 'yulia@example.com',
    phone: '+380676789012',
    city: 'Запоріжжя',
    photo: null,
    rating: 4.3,
    status: 'active',
    joinedDate: '2021-07-05',
    completedProjects: 10,
    skills: ['Медицина', 'Перша допомога', 'Реабілітація']
  },
  {
    id: '7',
    firstName: 'Віталій',
    lastName: 'Кравчук',
    email: 'vitaliy@example.com',
    phone: '+380637890123',
    city: 'Вінниця',
    photo: null,
    rating: 3.9,
    status: 'inactive',
    joinedDate: '2022-04-18',
    completedProjects: 3,
    skills: ['Юридична підтримка', 'Документація', 'Консультації']
  },
  {
    id: '8',
    firstName: 'Наталія',
    lastName: 'Лисенко',
    email: 'natalia@example.com',
    phone: '+380998901234',
    city: 'Житомир',
    photo: null,
    rating: 4.6,
    status: 'active',
    joinedDate: '2021-09-12',
    completedProjects: 14,
    skills: ['Кулінарія', 'Харчування', 'Організація харчування']
  },
  {
    id: '9',
    firstName: 'Андрій',
    lastName: 'Савченко',
    email: 'andriy@example.com',
    phone: '+380509012345',
    city: 'Тернопіль',
    photo: null,
    rating: 4.4,
    status: 'active',
    joinedDate: '2022-02-28',
    completedProjects: 9,
    skills: ['Фотографія', 'Відеозйомка', 'Монтаж']
  },
  {
    id: '10',
    firstName: 'Оксана',
    lastName: 'Василенко',
    email: 'oksana@example.com',
    phone: '+380670123456',
    city: 'Луцьк',
    photo: null,
    rating: 4.1,
    status: 'pending',
    joinedDate: '2022-05-20',
    completedProjects: 4,
    skills: ['Соціальна робота', 'Робота з людьми похилого віку', 'Догляд']
  }
];

export const useManagerVolunteersStore = defineStore('managerVolunteers', () => {
  // State
  const volunteers = ref<VolunteerListItem[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const totalVolunteers = ref(0);
  const filters = ref({
    status: null as string | null,
    city: null as string | null,
    searchTerm: '' as string,
    skill: null as string | null
  });

  // Actions
  const fetchVolunteers = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Simulate randomized network delay between 2s and 6s for consistent UX
      const randomMs = 2000 + Math.floor(Math.random() * 4000);
      await new Promise(resolve => setTimeout(resolve, randomMs));
      
      // Load from storage if present, otherwise seed with mock data
      const stored = loadFromStorage<VolunteerListItem[] | null>('manager.volunteers', null);
      volunteers.value = stored && Array.isArray(stored) ? stored : [...mockVolunteers];
      // Ensure at least 50 items by cloning with slight variations (mocking only)
      if (volunteers.value.length < 50) {
        const base = [...volunteers.value];
        let i = 0;
        while (volunteers.value.length < 50) {
          const src = base[i % base.length];
          const n = volunteers.value.length + 1;
          const firsts = ['Олександр','Марія','Іван','Анна','Максим','Юлія','Віталій','Наталія','Андрій','Оксана'];
          const lasts = ['Петренко','Коваленко','Мельник','Шевченко','Бондаренко','Ткаченко','Кравчук','Лисенко','Савченко','Василенко'];
          volunteers.value.push({
            ...src,
            id: String(n),
            firstName: firsts[n % firsts.length],
            lastName: lasts[n % lasts.length],
            email: src.email.replace('@', `+${n}@`),
            city: ['Київ','Львів','Харків','Одеса','Дніпро','Запоріжжя','Вінниця','Житомир','Тернопіль','Луцьк'][n % 10],
            status: (['active','pending','suspended','inactive'] as const)[n % 4],
          });
          i++;
        }
      }
      totalVolunteers.value = volunteers.value.length;
      saveToStorage('manager.volunteers', volunteers.value);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load volunteers';
      console.error('Error fetching volunteers:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const updateVolunteerStatus = async (id: string, status: 'active' | 'pending' | 'suspended' | 'inactive') => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, this would be an API call
      // await $fetch(`/api/manager/volunteers/${id}/status`, {
      //   method: 'PUT',
      //   body: { status }
      // });
      
      // Update local state
      const index = volunteers.value.findIndex(vol => vol.id === id);
      if (index !== -1) {
        volunteers.value[index] = {
          ...volunteers.value[index],
          status
        };
      }
      
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update volunteer status';
      console.error('Error updating volunteer status:', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const getFilteredVolunteers = computed(() => {
    let result = [...volunteers.value];
    
    // Apply status filter
    if (filters.value.status) {
      result = result.filter(vol => vol.status === filters.value.status);
    }
    
    // Apply city filter
    if (filters.value.city) {
      result = result.filter(vol => vol.city === filters.value.city);
    }
    
    // Apply skill filter
    if (filters.value.skill) {
      result = result.filter(vol => vol.skills.includes(filters.value.skill!));
    }
    
    // Apply search term
    if (filters.value.searchTerm) {
      const searchLower = filters.value.searchTerm.toLowerCase();
      result = result.filter(vol => 
        vol.firstName.toLowerCase().includes(searchLower) ||
        vol.lastName.toLowerCase().includes(searchLower) ||
        vol.email.toLowerCase().includes(searchLower) ||
        `${vol.firstName} ${vol.lastName}`.toLowerCase().includes(searchLower)
      );
    }
    
    return result;
  });

  const getAvailableCities = computed(() => {
    const cities = new Set<string>();
    volunteers.value.forEach(vol => {
      cities.add(vol.city);
    });
    return Array.from(cities).sort();
  });

  const getAvailableSkills = computed(() => {
    const skills = new Set<string>();
    volunteers.value.forEach(vol => {
      vol.skills.forEach(skill => {
        skills.add(skill);
      });
    });
    return Array.from(skills).sort();
  });

  const getStatusCounts = computed(() => {
    const counts = {
      active: 0,
      pending: 0,
      suspended: 0,
      inactive: 0,
      total: volunteers.value.length
    };
    
    volunteers.value.forEach(vol => {
      counts[vol.status]++;
    });
    
    return counts;
  });

  // Initialize
  fetchVolunteers();

  return {
    // State
    volunteers,
    isLoading,
    error,
    totalVolunteers,
    filters,
    
    // Actions
    fetchVolunteers,
    updateVolunteerStatus,
    
    // Getters
    getFilteredVolunteers,
    getAvailableCities,
    getAvailableSkills,
    getStatusCounts
  };
});

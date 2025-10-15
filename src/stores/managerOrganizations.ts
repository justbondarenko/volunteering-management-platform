import { defineStore } from 'pinia';
import { loadFromStorage, saveToStorage } from '~/utils/persist';
import { z } from 'zod';
import type { Organization } from './organization';

// Define the organization list schema using Zod
const organizationListSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    city: z.string(),
    edrpou: z.string(),
    rating: z.number().min(0).max(5),
    status: z.enum(['active', 'pending', 'suspended', 'inactive']),
    joinedDate: z.string(),
    completedProjects: z.number(),
    activeProjects: z.number(),
  })
);

// TypeScript type derived from the schema
export type OrganizationListItem = z.infer<typeof organizationListSchema>[0];

// Mock organizations data
const mockOrganizations: OrganizationListItem[] = [
  {
    id: '1',
    name: 'Благодійний Фонд "Допомога"',
    email: 'organization@example.com',
    phone: '+380501234567',
    city: 'Київ',
    edrpou: '1234567890',
    rating: 4.8,
    status: 'active',
    joinedDate: '2021-05-15',
    completedProjects: 24,
    activeProjects: 5,
  },
  {
    id: '2',
    name: 'Громадська Організація "Майбутнє"',
    email: 'future@example.com',
    phone: '+380672345678',
    city: 'Львів',
    edrpou: '2345678901',
    rating: 4.5,
    status: 'active',
    joinedDate: '2020-11-23',
    completedProjects: 18,
    activeProjects: 3,
  },
  {
    id: '3',
    name: 'Фонд "Відродження"',
    email: 'revival@example.com',
    phone: '+380633456789',
    city: 'Одеса',
    edrpou: '3456789012',
    rating: 4.2,
    status: 'active',
    joinedDate: '2022-01-10',
    completedProjects: 12,
    activeProjects: 2,
  },
  {
    id: '4',
    name: 'Волонтерський Центр "Єдність"',
    email: 'unity@example.com',
    phone: '+380994567890',
    city: 'Харків',
    edrpou: '4567890123',
    rating: 4.7,
    status: 'active',
    joinedDate: '2021-08-05',
    completedProjects: 20,
    activeProjects: 4,
  },
  {
    id: '5',
    name: 'Благодійна Організація "Турбота"',
    email: 'care@example.com',
    phone: '+380505678901',
    city: 'Дніпро',
    edrpou: '5678901234',
    rating: 4.0,
    status: 'pending',
    joinedDate: '2023-02-18',
    completedProjects: 0,
    activeProjects: 1,
  },
  {
    id: '6',
    name: 'Фонд "Світло Надії"',
    email: 'light@example.com',
    phone: '+380676789012',
    city: 'Запоріжжя',
    edrpou: '6789012345',
    rating: 4.3,
    status: 'active',
    joinedDate: '2022-06-30',
    completedProjects: 8,
    activeProjects: 2,
  },
  {
    id: '7',
    name: 'Громадська Ініціатива "Зміни"',
    email: 'changes@example.com',
    phone: '+380637890123',
    city: 'Вінниця',
    edrpou: '7890123456',
    rating: 3.9,
    status: 'suspended',
    joinedDate: '2021-12-15',
    completedProjects: 5,
    activeProjects: 0,
  },
  {
    id: '8',
    name: 'Волонтерська Група "Підтримка"',
    email: 'support@example.com',
    phone: '+380998901234',
    city: 'Житомир',
    edrpou: '8901234567',
    rating: 4.1,
    status: 'active',
    joinedDate: '2022-09-10',
    completedProjects: 7,
    activeProjects: 2,
  },
  {
    id: '9',
    name: 'Благодійний Фонд "Нове Життя"',
    email: 'newlife@example.com',
    phone: '+380509012345',
    city: 'Тернопіль',
    edrpou: '9012345678',
    rating: 4.6,
    status: 'inactive',
    joinedDate: '2020-07-22',
    completedProjects: 15,
    activeProjects: 0,
  },
  {
    id: '10',
    name: 'Центр Допомоги "Разом"',
    email: 'together@example.com',
    phone: '+380670123456',
    city: 'Луцьк',
    edrpou: '0123456789',
    rating: 4.4,
    status: 'active',
    joinedDate: '2021-10-05',
    completedProjects: 10,
    activeProjects: 3,
  }
];

export const useManagerOrganizationsStore = defineStore('managerOrganizations', () => {
  // State
  const organizations = ref<OrganizationListItem[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const totalOrganizations = ref(0);
  const filters = ref({
    status: null as string | null,
    city: null as string | null,
    searchTerm: '' as string,
  });

  // Actions
  const fetchOrganizations = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Simulate randomized network delay between 2s and 6s for consistent UX
      const randomMs = 2000 + Math.floor(Math.random() * 4000);
      await new Promise(resolve => setTimeout(resolve, randomMs));
      
      // Load from storage if present, otherwise seed with mock data
      const stored = loadFromStorage<OrganizationListItem[] | null>('manager.organizations', null);
      organizations.value = stored && Array.isArray(stored) ? stored : [...mockOrganizations];
      // Ensure at least 50 items by cloning with slight variations (mocking only)
      if (organizations.value.length < 50) {
        const base = [...organizations.value];
        let i = 0;
        while (organizations.value.length < 50) {
          const src = base[i % base.length];
          const n = organizations.value.length + 1;
          organizations.value.push({
            ...src,
            id: String(n),
            name: `${src.name} №${n}`,
            email: src.email.replace('@', `+${n}@`),
            edrpou: String(1000000000 + n),
            city: ['Київ','Львів','Харків','Одеса','Дніпро','Запоріжжя','Вінниця','Житомир','Тернопіль','Луцьк'][n % 10],
            status: (['active','pending','suspended','inactive'] as const)[n % 4],
          });
          i++;
        }
      }
      totalOrganizations.value = organizations.value.length;
      // persist current dataset
      saveToStorage('manager.organizations', organizations.value);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load organizations';
      console.error('Error fetching organizations:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const updateOrganizationStatus = async (id: string, status: 'active' | 'pending' | 'suspended' | 'inactive') => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update local state
      const index = organizations.value.findIndex(org => org.id === id);
      if (index !== -1) {
        organizations.value[index] = {
          ...organizations.value[index],
          status
        };
        saveToStorage('manager.organizations', organizations.value);
      }
      
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update organization status';
      console.error('Error updating organization status:', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const getFilteredOrganizations = computed(() => {
    let result = [...organizations.value];
    
    // Apply status filter
    if (filters.value.status) {
      result = result.filter(org => org.status === filters.value.status);
    }
    
    // Apply city filter
    if (filters.value.city) {
      result = result.filter(org => org.city === filters.value.city);
    }
    
    // Apply search term
    if (filters.value.searchTerm) {
      const searchLower = filters.value.searchTerm.toLowerCase();
      result = result.filter(org => 
        org.name.toLowerCase().includes(searchLower) ||
        org.email.toLowerCase().includes(searchLower) ||
        org.edrpou.includes(filters.value.searchTerm)
      );
    }
    
    return result;
  });

  const getAvailableCities = computed(() => {
    const cities = new Set<string>();
    organizations.value.forEach(org => {
      cities.add(org.city);
    });
    return Array.from(cities).sort();
  });

  const getStatusCounts = computed(() => {
    const counts = {
      active: 0,
      pending: 0,
      suspended: 0,
      inactive: 0,
      total: organizations.value.length
    };
    
    organizations.value.forEach(org => {
      counts[org.status]++;
    });
    
    return counts;
  });

  // Initialize
  fetchOrganizations();

  return {
    // State
    organizations,
    isLoading,
    error,
    totalOrganizations,
    filters,
    
    // Actions
    fetchOrganizations,
    updateOrganizationStatus,
    
    // Getters
    getFilteredOrganizations,
    getAvailableCities,
    getStatusCounts
  };
});

import { defineStore } from 'pinia';
import type { AdminProject } from '~/types/admin';
import { fetchMockData, simulateMutation } from '~/utils/mock-api';
import { loadFromStorage, saveToStorage } from '~/utils/persist';

const STORAGE_KEY = 'manager.projects';

export const useManagerProjectsStore = defineStore('manager-projects', () => {
  const projects = ref<AdminProject[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const filters = ref<{ status: AdminProject['status'] | 'All' | null; city: string | null; search: string }>({ status: 'All', city: null, search: '' });
  const initialized = ref(false);

  const load = async () => {
    if (initialized.value) return;
    isLoading.value = true;
    error.value = null;
    try {
      // Simulate randomized network delay between 2s and 6s for consistent UX
      const randomMs = 2000 + Math.floor(Math.random() * 4000);
      await new Promise((resolve) => setTimeout(resolve, randomMs));
      const stored = loadFromStorage<AdminProject[] | null>(STORAGE_KEY, null);
      projects.value = stored && Array.isArray(stored) ? stored : await fetchMockData<AdminProject[]>('admin-projects.json');
      // Ensure minimal variety (mock): expand to ~20 if less
      if (projects.value.length < 20) {
        const base = [...projects.value];
        let i = 0;
        while (projects.value.length < 20) {
          const src = base[i % base.length];
          const n = projects.value.length + 1;
          projects.value.push({
            ...src,
            id: `p_${5000 + n}`,
            title: `${src.title} №${n}`,
            city: ['Київ','Львів','Харків','Одеса','Дніпро'][n % 5],
            status: (['Pending','Approved','Rejected','Needs Info'] as const)[n % 4],
          });
          i++;
        }
      }
      saveToStorage(STORAGE_KEY, projects.value);
      initialized.value = true;
    } catch (e) {
      error.value = 'Не вдалося завантажити проекти';
    } finally {
      isLoading.value = false;
    }
  };

  const filtered = computed(() => {
    let list = [...projects.value];
    const { status, city, search } = filters.value;
    if (status && status !== 'All') list = list.filter(p => p.status === status);
    if (city) list = list.filter(p => p.city === city);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.organizationName.toLowerCase().includes(q));
    }
    return list;
  });

  const approve = async (id: string) => {
    await simulateMutation(true);
    const i = projects.value.findIndex(p => p.id === id);
    if (i !== -1) {
      projects.value[i] = { ...projects.value[i], status: 'Approved', rejectionReason: undefined, requestMessage: undefined, decidedAt: new Date().toISOString() };
      saveToStorage(STORAGE_KEY, projects.value);
    }
  };

  const reject = async (id: string, reason: string) => {
    await simulateMutation(true);
    const i = projects.value.findIndex(p => p.id === id);
    if (i !== -1) {
      projects.value[i] = { ...projects.value[i], status: 'Rejected', rejectionReason: reason, requestMessage: undefined, decidedAt: new Date().toISOString() };
      saveToStorage(STORAGE_KEY, projects.value);
    }
  };

  const requestInfo = async (id: string, message: string) => {
    await simulateMutation(true);
    const i = projects.value.findIndex(p => p.id === id);
    if (i !== -1) {
      projects.value[i] = { ...projects.value[i], status: 'Needs Info', requestMessage: message, rejectionReason: undefined };
      saveToStorage(STORAGE_KEY, projects.value);
    }
  };

  const cities = computed(() => Array.from(new Set(projects.value.map(p => p.city).filter(Boolean))) as string[]);

  const statusCounts = computed(() => {
    const counts = { total: projects.value.length, pending: 0, approved: 0, rejected: 0, needsInfo: 0 };
    for (const p of projects.value) {
      if (p.status === 'Pending') counts.pending++;
      else if (p.status === 'Approved') counts.approved++;
      else if (p.status === 'Rejected') counts.rejected++;
      else if (p.status === 'Needs Info') counts.needsInfo++;
    }
    return counts;
  });

  // Initialize (align with other manager stores)
  // Fire and forget; guards with `initialized` ensure single load
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  load();

  return { projects, isLoading, error, filters, filtered, load, approve, reject, requestInfo, cities, statusCounts };
});


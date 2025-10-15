import { defineStore } from 'pinia';
import type { OrganizationApplication } from '~/types/admin';
import { fetchMockData, simulateMutation } from '~/utils/mock-api';
import { loadFromStorage, saveToStorage } from '~/utils/persist';

const STORAGE_KEY = 'manager-org-queue';

export const useManagerOrgQueueStore = defineStore('manager-org-queue', {
  state: () => ({
    requests: [] as OrganizationApplication[],
    filter: 'Pending' as 'Pending' | 'Approved' | 'Rejected' | 'All',
    isLoading: false,
    errorMessage: undefined as string | undefined,
    initialized: false,
    active: null as OrganizationApplication | null,
  }),
  getters: {
    filtered(state): OrganizationApplication[] {
      if (state.filter === 'All') return state.requests;
      return state.requests.filter((r) => r.status === state.filter);
    },
  },
  actions: {
    async load(): Promise<void> {
      if (this.initialized) return;
      this.isLoading = true;
      this.errorMessage = undefined;
      try {
        const fromStorage = loadFromStorage<OrganizationApplication[] | null>(STORAGE_KEY, null);
        if (fromStorage && Array.isArray(fromStorage)) {
          this.requests = fromStorage;
        } else {
          this.requests = await fetchMockData<OrganizationApplication[]>('admin-org-requests.json');
          saveToStorage(STORAGE_KEY, this.requests);
        }
        this.initialized = true;
      } catch (e) {
        this.errorMessage = 'Failed to load verification requests';
      } finally {
        this.isLoading = false;
      }
    },
    setActive(req: OrganizationApplication | null): void {
      this.active = req;
    },
    async approve(id: string): Promise<void> {
      const idx = this.requests.findIndex((r) => r.id === id);
      if (idx === -1) return;
      await simulateMutation(true);
      this.requests.splice(idx, 1, { ...this.requests[idx], status: 'Approved', decidedAt: new Date().toISOString(), rejectionReason: undefined });
      saveToStorage(STORAGE_KEY, this.requests);
    },
    async reject(id: string, reason: string): Promise<void> {
      const idx = this.requests.findIndex((r) => r.id === id);
      if (idx === -1) return;
      await simulateMutation(true);
      this.requests.splice(idx, 1, { ...this.requests[idx], status: 'Rejected', decidedAt: new Date().toISOString(), rejectionReason: reason });
      saveToStorage(STORAGE_KEY, this.requests);
    },
  },
});


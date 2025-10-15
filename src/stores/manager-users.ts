import { defineStore } from 'pinia';
import type { UserProfileAdmin } from '~/types/admin';
import { fetchMockData, simulateMutation } from '~/utils/mock-api';
import { loadFromStorage, saveToStorage } from '~/utils/persist';

const STORAGE_KEY = 'manager-users';

export const useManagerUsersStore = defineStore('manager-users', {
  state: () => ({
    users: [] as UserProfileAdmin[],
    search: '',
    status: 'All' as 'All' | 'Active' | 'Blocked',
    role: 'All' as 'All' | 'User' | 'Admin' | 'Org Rep',
    sortField: 'name' as keyof UserProfileAdmin,
    sortOrder: 1 as 1 | -1,
    isLoading: false,
    errorMessage: undefined as string | undefined,
    initialized: false,
  }),
  getters: {
    filtered(state): UserProfileAdmin[] {
      const term = state.search.trim().toLowerCase();
      return state.users.filter((u) => {
        const matchesSearch = !term || u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term);
        const matchesStatus = state.status === 'All' || u.status === state.status;
        const matchesRole = state.role === 'All' || u.role === state.role;
        return matchesSearch && matchesStatus && matchesRole;
      });
    },
    sorted(state): UserProfileAdmin[] {
      const list = [...(this as any).filtered as UserProfileAdmin[]];
      return list.sort((a, b) => {
        const field = state.sortField;
        const av = (a as any)[field];
        const bv = (b as any)[field];
        if (av === bv) return 0;
        return (av > bv ? 1 : -1) * state.sortOrder;
      });
    },
  },
  actions: {
    async load(): Promise<void> {
      if (this.initialized) return;
      this.isLoading = true;
      this.errorMessage = undefined;
      try {
        const fromStorage = loadFromStorage<UserProfileAdmin[] | null>(STORAGE_KEY, null);
        if (fromStorage && Array.isArray(fromStorage)) {
          this.users = fromStorage;
        } else {
          this.users = await fetchMockData<UserProfileAdmin[]>('admin-users.json');
          saveToStorage(STORAGE_KEY, this.users);
        }
        this.initialized = true;
      } catch (e) {
        this.errorMessage = 'Failed to load users';
      } finally {
        this.isLoading = false;
      }
    },
    async updateUser(updated: UserProfileAdmin): Promise<void> {
      const idx = this.users.findIndex((u) => u.id === updated.id);
      if (idx === -1) return;
      const next = { ...updated, updatedAt: new Date().toISOString() };
      await simulateMutation(true);
      this.users.splice(idx, 1, next);
      saveToStorage(STORAGE_KEY, this.users);
    },
    async toggleStatus(userId: string): Promise<void> {
      const idx = this.users.findIndex((u) => u.id === userId);
      if (idx === -1) return;
      const current = this.users[idx];
      const nextStatus = current.status === 'Active' ? 'Blocked' : 'Active';
      await simulateMutation(true);
      this.users.splice(idx, 1, { ...current, status: nextStatus, updatedAt: new Date().toISOString() });
      saveToStorage(STORAGE_KEY, this.users);
    },
    setSort(field: keyof UserProfileAdmin): void {
      if (this.sortField === field) {
        this.sortOrder = (this.sortOrder === 1 ? -1 : 1);
      } else {
        this.sortField = field;
        this.sortOrder = 1;
      }
    },
  },
});


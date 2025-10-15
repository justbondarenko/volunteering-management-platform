import { defineStore } from 'pinia';
import type { AnalyticsPayload } from '~/types/admin';
import { fetchMockData } from '~/utils/mock-api';

export const useManagerAnalyticsStore = defineStore('manager-analytics', {
  state: () => ({
    data: null as AnalyticsPayload | null,
    isLoading: false,
    errorMessage: undefined as string | undefined,
    initialized: false,
  }),
  actions: {
    async load(): Promise<void> {
      if (this.initialized) return;
      this.isLoading = true;
      this.errorMessage = undefined;
      try {
        this.data = await fetchMockData<AnalyticsPayload>('analytics.json');
        this.initialized = true;
      } catch (e) {
        this.errorMessage = 'Failed to load analytics';
      } finally {
        this.isLoading = false;
      }
    },
  },
});


import { defineStore } from 'pinia';
import type { AdminEvent, AdminReview } from '~/types/admin';
import { fetchMockData, simulateMutation } from '~/utils/mock-api';
import { loadFromStorage, saveToStorage } from '~/utils/persist';

const STORAGE_EVENTS = 'manager-events';
const STORAGE_REVIEWS = 'manager-reviews';

export const useManagerModerationStore = defineStore('manager-moderation', {
  state: () => ({
    events: [] as AdminEvent[],
    reviews: [] as AdminReview[],
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
        const ev = loadFromStorage<AdminEvent[] | null>(STORAGE_EVENTS, null);
        const rv = loadFromStorage<AdminReview[] | null>(STORAGE_REVIEWS, null);
        this.events = ev ?? await fetchMockData<AdminEvent[]>('admin-events.json');
        this.reviews = rv ?? await fetchMockData<AdminReview[]>('admin-reviews.json');
        saveToStorage(STORAGE_EVENTS, this.events);
        saveToStorage(STORAGE_REVIEWS, this.reviews);
        this.initialized = true;
      } catch (e) {
        this.errorMessage = 'Failed to load moderation data';
      } finally {
        this.isLoading = false;
      }
    },
    async updateEvent(updated: AdminEvent): Promise<void> {
      const idx = this.events.findIndex((e) => e.id === updated.id);
      if (idx === -1) return;
      await simulateMutation(true);
      this.events.splice(idx, 1, updated);
      saveToStorage(STORAGE_EVENTS, this.events);
    },
    async deleteEvent(id: string): Promise<void> {
      const idx = this.events.findIndex((e) => e.id === id);
      if (idx === -1) return;
      await simulateMutation(true);
      this.events.splice(idx, 1);
      saveToStorage(STORAGE_EVENTS, this.events);
    },
    async deleteReview(id: string): Promise<void> {
      const idx = this.reviews.findIndex((r) => r.id === id);
      if (idx === -1) return;
      await simulateMutation(true);
      this.reviews.splice(idx, 1);
      saveToStorage(STORAGE_REVIEWS, this.reviews);
    },
  },
});


import { defineStore } from 'pinia';
import type { DictionaryItem } from '~/types/admin';
import { fetchMockData, simulateMutation } from '~/utils/mock-api';
import { loadFromStorage, saveToStorage } from '~/utils/persist';

type DictKey = 'cities' | 'categories' | 'skills';

const STORAGE_PREFIX = 'manager-dict-';

export const useManagerDictionariesStore = defineStore('manager-dictionaries', {
  state: () => ({
    cities: [] as DictionaryItem[],
    categories: [] as DictionaryItem[],
    skills: [] as DictionaryItem[],
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
        this.cities = loadFromStorage(STORAGE_PREFIX + 'cities', await fetchMockData<DictionaryItem[]>('dictionaries-cities.json'));
        this.categories = loadFromStorage(STORAGE_PREFIX + 'categories', await fetchMockData<DictionaryItem[]>('dictionaries-categories.json'));
        this.skills = loadFromStorage(STORAGE_PREFIX + 'skills', await fetchMockData<DictionaryItem[]>('dictionaries-skills.json'));
        saveToStorage(STORAGE_PREFIX + 'cities', this.cities);
        saveToStorage(STORAGE_PREFIX + 'categories', this.categories);
        saveToStorage(STORAGE_PREFIX + 'skills', this.skills);
        this.initialized = true;
      } catch (e) {
        this.errorMessage = 'Failed to load dictionaries';
      } finally {
        this.isLoading = false;
      }
    },
    list(key: DictKey): DictionaryItem[] { return this[key]; },
    async add(key: DictKey, name: string): Promise<void> {
      const id = `${key}_${Math.random().toString(36).slice(2, 8)}`;
      await simulateMutation(true);
      this[key].push({ id, name });
      saveToStorage(STORAGE_PREFIX + key, this[key]);
    },
    async update(key: DictKey, item: DictionaryItem): Promise<void> {
      const idx = this[key].findIndex((i) => i.id === item.id);
      if (idx === -1) return;
      await simulateMutation(true);
      this[key].splice(idx, 1, item);
      saveToStorage(STORAGE_PREFIX + key, this[key]);
    },
    async remove(key: DictKey, id: string): Promise<void> {
      const idx = this[key].findIndex((i) => i.id === id);
      if (idx === -1) return;
      await simulateMutation(true);
      this[key].splice(idx, 1);
      saveToStorage(STORAGE_PREFIX + key, this[key]);
    },
  },
});


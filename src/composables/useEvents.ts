import type { VolunteerEventItem } from '~/types';

export const useEvents = () => {
  const events = ref<VolunteerEventItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadEvents = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Import the mock data
      const mockEvents = await import('~/data/events.json');
      events.value = mockEvents.default || mockEvents;
    } catch (err) {
      error.value = 'Failed to load events';
      console.error('Error loading events:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    events: readonly(events),
    loading: readonly(loading),
    error: readonly(error),
    loadEvents
  };
};

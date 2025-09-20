import { defineStore } from 'pinia'

export interface Event {
  id: string
  title: string
  date: string
  location: string
  description: string
  status: 'open' | 'closed' | 'completed'
  volunteersNeeded: number
  volunteersAssigned: number
}

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [] as Event[],
    loading: false,
    error: null as string | null
  }),

  getters: {
    // Get the 5 most recent events (sorted by date)
    recentEvents: (state) => {
      return state.events
        .filter(event => event.status === 'open')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5)
    },

    // Get all events
    allEvents: (state) => state.events,

    // Get events by status
    openEvents: (state) => state.events.filter(event => event.status === 'open'),
    closedEvents: (state) => state.events.filter(event => event.status === 'closed'),
    completedEvents: (state) => state.events.filter(event => event.status === 'completed'),

    // Get events by location
    eventsByLocation: (state) => (location: string) => {
      return state.events.filter(event => 
        event.location.toLowerCase().includes(location.toLowerCase())
      )
    }
  },

  actions: {
    async fetchEvents() {
      this.loading = true
      this.error = null

      try {
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Import events data
        const eventsData = await import('~/data/events.json')
        this.events = eventsData.default || eventsData
      } catch (error) {
        this.error = 'Failed to load events'
        console.error('Error loading events:', error)
      } finally {
        this.loading = false
      }
    },

    // Get event by ID
    getEventById(id: string) {
      return this.events.find(event => event.id === id)
    },

    // Update event status
    updateEventStatus(id: string, status: Event['status']) {
      const event = this.events.find(event => event.id === id)
      if (event) {
        event.status = status
      }
    },

    // Add volunteer to event
    addVolunteerToEvent(id: string) {
      const event = this.events.find(event => event.id === id)
      if (event && event.volunteersAssigned < event.volunteersNeeded) {
        event.volunteersAssigned += 1
      }
    },

    // Remove volunteer from event
    removeVolunteerFromEvent(id: string) {
      const event = this.events.find(event => event.id === id)
      if (event && event.volunteersAssigned > 0) {
        event.volunteersAssigned -= 1
      }
    }
  }
})

<template>
  <div
    class="border rounded-lg p-4 w-full h-fit flex flex-col gap-4 items-start bg-gray-100/50"
  >
    <span class="text-2xl font-bold">Останні події</span>

    <div v-if="eventsStore.loading" class="w-full flex justify-center py-8">
      <i class="pi pi-spinner pi-spin text-2xl"></i>
    </div>

    <div v-else-if="eventsStore.error" class="w-full flex justify-center py-8 text-red-500">
      {{ eventsStore.error }}
    </div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-5 gap-4 w-full items-stretch"
    >
      <EventCard
        v-for="event in recentEvents"
        :key="event.id"
        :event="event"
        show-join-button
        @join="joinEvent"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEventsStore } from "~/stores/events";

const eventsStore = useEventsStore();

// Get the 5 most recent events from the store
const recentEvents = computed(() => eventsStore.recentEvents);

// Join event functionality
const joinEvent = (eventId: string) => {
  eventsStore.addVolunteerToEvent(eventId);
  // You can add additional logic here like showing a success message
  console.log(`Joined event ${eventId}`);
};

// Load events when component is mounted
onMounted(() => {
  eventsStore.fetchEvents();
});
</script>

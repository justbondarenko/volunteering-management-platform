<template>
  <div
    class="border rounded-lg p-4 w-full h-fit flex flex-col gap-4 items-start bg-gray-100/50"
  >
    <span class="text-2xl font-bold">Останні події</span>
    <div class="w-full">
      <div class="flex items-center justify-between">
        <InputText v-model="search" placeholder="Пошук" />
        <Select
          v-model="selectedCity"
          :options="cities"
          optionLabel="name"
          placeholder="Виберіть місто"
          class="w-full md:w-56"
          @change="filterEvents"
          showClear
        />
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-5 auto-cols-fr gap-4 w-full">
      <Card v-for="event in filteredEvents" :key="event.id" class="bg-slate-50">
        <template #content>
          <div class="flex items-start justify-between w-full gap-2">
            <div class="flex flex-col w-full gap-2 items-start">
              <span class="text-lg font-bold">{{ event.title }}</span>
              <span class="text-sm text-gray-700 inline-flex items-center gap-1"
                ><i class="pi pi-calendar" />{{ event.date }}</span
              >
              <span class="text-sm text-gray-700"
                ><i class="pi pi-building" /> {{ event.organization }}</span
              >
              <span class="text-sm text-gray-700 flex items-center gap-1">
                <i class="pi pi-map-marker" /> {{ event.city }}</span
              >
            </div>
            <div class="flex items-start justify-between w-full">
              <div class="flex flex-col w-full gap-0.5 items-end">
                <span class="text-xl text-gray-700">Відгукнулось:</span>
                <div
                  class="flex items-center gap-2 text-3xl font-black text-right"
                >
                  {{ event.volunteers }} / {{ event.required }}
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex w-full gap-2 items-end justify-end">
            <Button label="Приєднатись" size="small" />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
  city: string;
  organization: string;
  required: number;
  volunteers: number;
};

type City = {
  name: string;
  code: string;
};

import Card from "primevue/card";
import Select from "primevue/select";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

defineComponent({
  name: "EventsFeed",
});

const search = ref("");
const filteredEvents = ref<Event[]>([]);
const selectedCity = ref<City | null>(null);

const cities = ref([
  { name: "Київ", code: "KYIV" },
  { name: "Львів", code: "LVIV" },
  { name: "Одеса", code: "ODESA" },
  { name: "Харків", code: "KHARKOV" },
  { name: "Дніпро", code: "DNIPRO" },
]);

const events = ref(
  Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: `Подія ${index + 1}`,
    date: "10.09.2025",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    city: cities.value[Math.floor(Math.random() * cities.value.length)].name,
    organization: "Організація 1",
    required: 10,
    volunteers: Math.floor(Math.random() * 10),
  }))
);

const filterEvents = () => {
  if (selectedCity.value) {
    filteredEvents.value = events.value.filter((event: any) => event.city === selectedCity.value?.name);
  } else {
    filteredEvents.value = events.value;
  }
}; 

onMounted(() => {
  filterEvents();
});
</script>

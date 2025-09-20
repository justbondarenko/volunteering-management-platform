<template>
  <div class="flex w-full h-full flex-col gap-4 p-4">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Події для волонтерів</h1>
        <p class="text-gray-600">Знаходьте події та подавайте заявки на участь</p>
      </div>
    </div>

    <Card>
      <template #title>
        <div class="flex items-center gap-2">
          <i class="pi pi-filter" />
          <h2 class="text-xl font-semibold">Фільтри</h2>
        </div>
      </template>
      <template #content>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div class="flex flex-col gap-2 md:col-span-2">
            <label for="search" class="font-medium">Пошук</label>
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText id="search" v-model="filters.search" placeholder="Назва або опис події" />
            </IconField>
          </div>

          <div class="flex flex-col gap-2">
            <label for="city" class="font-medium">Місто</label>
            <Dropdown id="city" v-model="filters.city" :options="cityOptions" optionLabel="label" optionValue="value" placeholder="Будь-яке місто" />
          </div>

          <div class="flex flex-col gap-2">
            <label for="status" class="font-medium">Статус</label>
            <Dropdown id="status" v-model="filters.status" :options="statusOptions" optionLabel="label" optionValue="value" placeholder="Будь-який" />
          </div>

          <div class="flex flex-col gap-2">
            <label for="date" class="font-medium">Дата</label>
            <Calendar id="date" v-model="filters.date" showIcon placeholder="Будь-яка дата" dateFormat="dd MM yy" />
          </div>
        </div>
      </template>
    </Card>

    <Card>
      <template #title>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i class="pi pi-calendar" />
            <h2 class="text-xl font-semibold">Список подій</h2>
          </div>
          <span class="text-sm text-gray-500">Знайдено: {{ filteredEvents.length }}</span>
        </div>
      </template>
      <template #content>
        <DataView :value="filteredEvents" layout="grid" :paginator="true" :rows="10">
          <template #grid="{ items }">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <EventCard
                v-for="event in items"
                :key="event.id"
                :event="event"
                :loading="applyLoadingId === event.id"
                show-apply-button
                show-details-button
                @apply="apply"
                @view-details="viewDetails"
              />
            </div>
          </template>
        </DataView>
      </template>
    </Card>

    <!-- Event Details Modal -->
    <Dialog v-model:visible="showEventModal" modal :header="selectedEvent?.title" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div v-if="selectedEvent" class="flex flex-col gap-4">
        <!-- Event Header -->
        <div class="flex items-start justify-between gap-4">
          <div class="flex flex-col gap-2">
            <h3 class="text-xl font-semibold">{{ selectedEvent.title }}</h3>
            <div class="flex items-center gap-4 text-sm text-gray-600">
              <div class="flex items-center gap-1">
                <i class="pi pi-calendar" />
                <span>{{ formatDate(selectedEvent.date) }}</span>
              </div>
              <div class="flex items-center gap-1">
                <i class="pi pi-map-marker" />
                <span>{{ selectedEvent.location }}</span>
              </div>
            </div>
          </div>
          <Tag :value="statusLabel(selectedEvent.status)" :severity="statusSeverity(selectedEvent.status)" />
        </div>

        <!-- Event Description -->
        <div class="flex flex-col gap-2">
          <h4 class="font-semibold text-gray-800">Опис події</h4>
          <p class="text-gray-700 leading-relaxed">{{ selectedEvent.description }}</p>
        </div>

        <!-- Event Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <h4 class="font-semibold text-gray-800">Деталі участі</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Потрібно волонтерів:</span>
                <span class="font-medium">{{ selectedEvent.volunteersNeeded }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Зареєстровано:</span>
                <span class="font-medium">{{ selectedEvent.volunteersAssigned }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Залишилось місць:</span>
                <span class="font-medium text-green-600">{{ selectedEvent.volunteersNeeded - selectedEvent.volunteersAssigned }}</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <h4 class="font-semibold text-gray-800">Статус події</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Статус:</span>
                <Tag :value="statusLabel(selectedEvent.status)" :severity="statusSeverity(selectedEvent.status)" />
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Дата проведення:</span>
                <span class="font-medium">{{ formatDate(selectedEvent.date) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Місце проведення:</span>
                <span class="font-medium">{{ selectedEvent.location }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="flex flex-col gap-2">
          <h4 class="font-semibold text-gray-800">Прогрес набору</h4>
          <div class="flex items-center gap-2">
            <ProgressBar :value="(selectedEvent.volunteersAssigned / selectedEvent.volunteersNeeded) * 100" :showValue="false" class="flex-1" />
            <span class="text-sm text-gray-600">{{ selectedEvent.volunteersAssigned }} / {{ selectedEvent.volunteersNeeded }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-between pt-4 border-t">
          <div class="flex items-center gap-2">
            <Button
              v-if="!selectedEvent.applied"
              label="Подати заявку"
              icon="pi pi-send"
              @click="apply(selectedEvent)"
              :loading="applyLoadingId === selectedEvent.id"
              :disabled="selectedEvent.status !== 'open' || selectedEvent.volunteersAssigned >= selectedEvent.volunteersNeeded"
            />
            <Tag v-else value="Заявка подана" severity="success" />
          </div>
          <Button label="Закрити" severity="secondary" @click="showEventModal = false" />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';
import type { VolunteerEventItem } from '~/types';
import { useEventsStore } from '~/stores/events';

// Ukrainian locale for date formatting
const uk = {
  firstDayOfWeek: 1,
  dayNames: ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'п\'ятниця', 'субота'],
  dayNamesShort: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  dayNamesMin: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  monthNames: ['січень', 'лютий', 'березень', 'квітень', 'травень', 'червень', 'липень', 'серпень', 'вересень', 'жовтень', 'листопад', 'грудень'],
  monthNamesShort: ['січ', 'лют', 'бер', 'кві', 'тра', 'чер', 'лип', 'сер', 'вер', 'жов', 'лис', 'гру'],
  today: 'Сьогодні',
  clear: 'Очистити',
  dateFormat: 'dd MM yy',
  weekHeader: 'Нед'
};

definePageMeta({
  layout: 'volunteer',
  middleware: 'volunteer-auth'
});

const toast = useToast();

const statusOptions = [
  { label: 'Відкриті', value: 'open' },
  { label: 'Закриті', value: 'closed' },
  { label: 'Завершені', value: 'completed' },
];

// Use events store instead of composable
const eventsStore = useEventsStore();

// Get events data from store
const allEvents = computed(() => eventsStore.allEvents);
const loading = computed(() => eventsStore.loading);
const error = computed(() => eventsStore.error);

// Load events on component mount
onMounted(() => {
  eventsStore.fetchEvents();
});

// Generate city options from available events
const cityOptions = computed(() => {
  if (!allEvents.value || !Array.isArray(allEvents.value)) return [];
  const cities = [...new Set(allEvents.value.map(event => {
    const city = event.location.split(',')[0].trim();
    return city;
  }))].sort();
  return cities.map(city => ({ label: city, value: city }));
});

const filters = ref<{ search: string; city: string; status: VolunteerEventItem['status'] | null; date: Date | null }>({
  search: '',
  city: '',
  status: null,
  date: null,
});

const filteredEvents = computed(() => {
  if (!allEvents.value || !Array.isArray(allEvents.value)) return [];
  
  return allEvents.value.filter((e) => {
    const matchesSearch = filters.value.search
      ? `${e.title} ${e.description}`.toLowerCase().includes(filters.value.search.toLowerCase())
      : true;
    const matchesCity = filters.value.city
      ? e.location.split(',')[0].trim().toLowerCase() === filters.value.city.toLowerCase()
      : true;
    const matchesStatus = filters.value.status ? e.status === filters.value.status : true;
    const matchesDate = filters.value.date
      ? (() => {
          const selectedDate = filters.value.date;
          const eventDate = new Date(e.date);
          
          // Reset time to start of day for comparison
          const selectedStartOfDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
          const eventStartOfDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
          
          // Show events that start on the selected date or are still active
          // For this prototype, we'll consider events as "active" for 1 day after their start date
          const eventEndOfDay = new Date(eventStartOfDay);
          eventEndOfDay.setDate(eventEndOfDay.getDate() + 1);
          
          return eventStartOfDay <= selectedStartOfDay && selectedStartOfDay < eventEndOfDay;
        })()
      : true;

    return matchesSearch && matchesCity && matchesStatus && matchesDate;
  });
});

const applyLoadingId = ref<string | null>(null);

const apply = async (event: VolunteerEventItem) => {
  if (event.applied) return;

  applyLoadingId.value = event.id;
  try {
    // Client-side validation: event must be open and not full
    const schema = z.object({
      status: z.literal('open'),
      capacity: z.number().refine((v) => v > 0, { message: 'Набір вже заповнено' }),
    });

    schema.parse({ status: event.status, capacity: event.volunteersNeeded - event.volunteersAssigned });

    // Simulate API call
    await new Promise((r) => setTimeout(r, 600));

    // Use store method to add volunteer
    eventsStore.addVolunteerToEvent(event.id);
    
    // Mark as applied (this would typically be handled by the store in a real app)
    event.applied = true;

    toast?.add({ severity: 'success', summary: 'Заявка подана', detail: `Ви успішно подали заявку на «${event.title}»`, life: 3000 });
  } catch (err) {
    const message = err instanceof z.ZodError ? err.issues?.[0]?.message ?? 'Не вдалося подати заявку' : 'Не вдалося подати заявку';
    toast?.add({ severity: 'warn', summary: 'Не вдалося', detail: message, life: 4000 });
  } finally {
    applyLoadingId.value = null;
  }
};

const formatDate = (iso: string) => {
  try {
    return new Intl.DateTimeFormat('uk-UA', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso));
  } catch {
    return iso;
  }
};

const statusLabel = (s: VolunteerEventItem['status']) => ({ open: 'Відкрито', closed: 'Закрито', completed: 'Завершено' }[s]);
const statusSeverity = (s: VolunteerEventItem['status']) => ({ open: 'success', closed: 'danger', completed: 'secondary' }[s]);

const selectedEvent = ref<VolunteerEventItem | null>(null);
const showEventModal = ref(false);

const viewDetails = (event: VolunteerEventItem) => {
  selectedEvent.value = event;
  showEventModal.value = true;
};

useHead({
  title: 'Події для волонтерів',
  meta: [{ name: 'description', content: 'Переглядайте події та подавайте заявки' }],
});
</script>


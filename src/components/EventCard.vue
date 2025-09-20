<template>
  <Card :class="`${cardClass} flex flex-col`" :pt="pt">
    <template #title>
      <div class="flex items-start justify-between gap-3">
        <div class="flex flex-col">
          <span class="text-lg font-semibold">{{ event.title }}</span>
          <span class="text-xs text-gray-500">{{ formatDate(event.date) }}</span>
        </div>
        <Tag :value="statusLabel(event.status)" :severity="statusSeverity(event.status)" />
      </div>
    </template>
    <template #content>
      <div class="flex flex-col gap-2 flex-1">
        <div class="flex items-center gap-2 text-gray-700">
          <i class="pi pi-map-marker" />
          <span>{{ event.location }}</span>
        </div>
        <p class="text-sm text-gray-700 line-clamp-3 flex-1">{{ event.description }}</p>
      </div>
    </template>
    <template #footer>
      <div class="flex flex-col gap-2">
        <span class="mt-2 text-sm text-gray-600">Волонтери: {{ event.volunteersAssigned }} / {{ event.volunteersNeeded }}</span>
        
        <div class="flex items-center justify-between mt-auto">
          <Button
            v-if="!event.applied && showApplyButton"
            label="Подати заявку"
            icon="pi pi-send"
            size="small"
            @click="handleApply"
            :loading="loading"
            :disabled="event.status !== 'open' || event.volunteersAssigned >= event.volunteersNeeded"
          />
          <Button
            v-else-if="!event.applied && showJoinButton"
            label="Приєднатись"
            size="small"
            @click="handleJoin"
            :disabled="event.volunteersAssigned >= event.volunteersNeeded"
          />
          <Tag v-else-if="event.applied" value="Заявка подана" severity="success" />
          <Button 
            v-if="showDetailsButton"
            label="Деталі" 
            size="small" 
            severity="secondary" 
            @click="handleViewDetails" 
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from "primevue/card";
import Button from "primevue/button";
import Tag from "primevue/tag";
import type { Event } from "~/stores/events";

interface Props {
  event: Event & { applied?: boolean };
  cardClass?: string;
  showApplyButton?: boolean;
  showJoinButton?: boolean;
  showDetailsButton?: boolean;
  loading?: boolean;
}

interface Emits {
  apply: [event: Event & { applied?: boolean }];
  join: [eventId: string];
  viewDetails: [event: Event & { applied?: boolean }];
}

const props = withDefaults(defineProps<Props>(), {
  cardClass: 'h-full',
  showApplyButton: false,
  showJoinButton: false,
  showDetailsButton: false,
  loading: false
});

const pt = {
  body: 'h-full',
  footer: 'mb-0 mt-auto'
}

const emit = defineEmits<Emits>();

// Format date to Ukrainian format
const formatDate = (dateString: string) => {
  try {
    return new Intl.DateTimeFormat('uk-UA', { 
      dateStyle: 'medium', 
      timeStyle: 'short' 
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
};

// Status label mapping
const statusLabel = (status: Event['status']) => ({
  open: 'Відкрито',
  closed: 'Закрито', 
  completed: 'Завершено'
}[status]);

// Status severity mapping
const statusSeverity = (status: Event['status']) => ({
  open: 'success',
  closed: 'danger',
  completed: 'secondary'
}[status]);

// Event handlers
const handleApply = () => {
  emit('apply', props.event);
};

const handleJoin = () => {
  emit('join', props.event.id);
};

const handleViewDetails = () => {
  emit('viewDetails', props.event);
};
</script>

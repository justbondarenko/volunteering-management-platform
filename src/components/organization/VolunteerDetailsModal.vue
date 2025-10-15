<template>
  <Dialog
    :visible="visible"
    :header="volunteer ? `${volunteer.firstName} ${volunteer.lastName}` : 'Деталі волонтера'"
    :modal="true"
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    @update:visible="$emit('update:visible', $event)"
  >
    <div v-if="volunteer" class="p-4">
      <div class="mb-4 flex flex-col gap-4 md:gap-8 md:flex-row">
        <!-- Volunteer photo/avatar -->
        <div class="flex items-center justify-center">
          <div
            class="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-primary bg-gray-100"
          >
            <img v-if="volunteer.photo" :src="volunteer.photo" alt="Volunteer" class="h-full w-full object-cover" />
            <i v-else class="pi pi-user text-5xl text-gray-400"></i>
          </div>
        </div>

        <!-- Basic info -->
        <div class="flex-1">
          <h2 class="mb-2 text-xl font-bold">{{ volunteer.firstName }} {{ volunteer.lastName }}</h2>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="flex flex-col gap-1">
              <span class="font-semibold">
                <i class="pi pi-calendar" />
                Дата народження:
              </span>
              <span>{{ new Date(volunteer.dateOfBirth).toLocaleDateString('uk-UA') }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="font-semibold">
                <i class="pi pi-star" />
                Рейтинг:
              </span>
              <Rating :modelValue="volunteer.rating" :readonly="true" :cancel="false" />
            </div>

            <div class="flex flex-col gap-1">
              <span class="font-semibold">
                <i class="pi pi-envelope" />
                Email:
              </span>
              <span>{{ volunteer.email }}</span>
            </div>

            <div class="flex flex-col gap-1">
              <span class="font-semibold">
                <i class="pi pi-phone" />
                Телефон:
              </span>
              <span>{{ volunteer.phone }}</span>
            </div>

            <div class="flex flex-col gap-1">
              <span class="font-semibold">
                <i class="pi pi-map-marker" />
                Адреса:
              </span>
              <span>{{ volunteer.address }}</span>
            </div>

            <div class="flex flex-col gap-1">
              <span class="font-semibold">
                <i class="pi pi-calendar" />
                Остання активність:
              </span>
              <span>{{ new Date(volunteer.lastWorkedWith).toLocaleDateString('uk-UA') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Projects and skills info -->
      <div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="rounded-lg border p-3">
          <div class="mb-1 text-sm text-gray-600">Проектів з нашою організацією</div>
          <div class="text-xl font-bold text-green-600">{{ volunteer.projectsWithOrganization }}</div>
        </div>

        <div class="rounded-lg border p-3">
          <div class="mb-1 text-sm text-gray-600">Навички</div>
          <div class="mt-1 flex flex-wrap gap-1">
            <Chip v-for="skill in volunteer.skills" :key="skill" :label="skill" class="text-xs" />
          </div>
        </div>
      </div>

      <!-- Age calculation -->
      <div class="mb-4 rounded-lg border p-3">
        <div class="mb-1 text-sm text-gray-600">Вік</div>
        <div class="text-lg font-semibold">{{ calculateAge(volunteer.dateOfBirth) }} років</div>
      </div>

      <!-- Actions -->
      <div class="mt-4 flex justify-end gap-2">
        <Button label="Закрити" icon="pi pi-times" severity="secondary" @click="closeModal" outlined />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import type { OrganizationVolunteer } from '~/types';

// Props
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  volunteer: {
    type: Object as PropType<OrganizationVolunteer | null>,
    default: null,
  },
});

// Emits
const emit = defineEmits(['update:visible']);

// Close modal
const closeModal = () => {
  emit('update:visible', false);
};

// Calculate age from date of birth
const calculateAge = (dateOfBirth: string) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};
</script>

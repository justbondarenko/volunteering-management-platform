<template>
  <div class="flex w-full h-full flex-col items-center p-4">
    <div class="w-full">
      <div v-if="volunteersStore.isLoading && volunteersStore.volunteers.length === 0" class="flex justify-center items-center py-8">
        <ProgressSpinner />
        <span class="ml-3">Завантаження волонтерів...</span>
      </div>

      <!-- Error state -->
      <div v-else-if="volunteersStore.error && volunteersStore.volunteers.length === 0" class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-600">{{ volunteersStore.error }}</p>
        <Button label="Спробувати знову" severity="secondary" class="mt-3" @click="volunteersStore.fetchVolunteers" />
      </div>

      <!-- Volunteers content -->
      <div v-else class="flex flex-col gap-6">
        <!-- Page header -->
        <Card>
          <template #content>
            <div class="flex items-center gap-3">
              <i class="pi pi-users text-2xl text-primary"></i>
              <div>
                <h1 class="text-2xl font-bold">Волонтери</h1>
                <p class="text-gray-600">Всі волонтери, з якими працювала ваша організація</p>
              </div>
            </div>
          </template>
        </Card>

        <!-- Statistics cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <template #content>
              <div class="flex items-center gap-3">
                <div class="p-3 bg-blue-100 rounded-full">
                  <i class="pi pi-users text-blue-600 text-xl"></i>
                </div>
                <div>
                  <div class="text-2xl font-bold">{{ volunteersStore.getVolunteersCount }}</div>
                  <div class="text-sm text-gray-600">Всього волонтерів</div>
                </div>
              </div>
            </template>
          </Card>

          <Card>
            <template #content>
              <div class="flex items-center gap-3">
                <div class="p-3 bg-green-100 rounded-full">
                  <i class="pi pi-star text-green-600 text-xl"></i>
                </div>
                <div>
                  <div class="text-2xl font-bold">{{ volunteersStore.getAverageRating.toFixed(1) }}</div>
                  <div class="text-sm text-gray-600">Середній рейтинг</div>
                </div>
              </div>
            </template>
          </Card>

          <Card>
            <template #content>
              <div class="flex items-center gap-3">
                <div class="p-3 bg-purple-100 rounded-full">
                  <i class="pi pi-flag text-purple-600 text-xl"></i>
                </div>
                <div>
                  <div class="text-2xl font-bold">{{ volunteersStore.getTotalProjects }}</div>
                  <div class="text-sm text-gray-600">Всього проектів</div>
                </div>
              </div>
            </template>
          </Card>
        </div>

        <!-- Volunteers table -->
        <Card>
          <template #title>
            <div class="flex items-center gap-2">
              <i class="pi pi-table"></i>
              <h2 class="text-xl font-semibold">Список волонтерів</h2>
            </div>
          </template>
          <template #content>
            <VolunteersTable 
              :volunteers="volunteersStore.volunteers" 
              :loading="volunteersStore.isLoading"
              @view-volunteer="openVolunteerModal"
            />
          </template>
        </Card>
      </div>
    </div>

    <!-- Volunteer details modal -->
    <VolunteerDetailsModal 
      :visible="isModalVisible" 
      :volunteer="selectedVolunteer"
      @update:visible="isModalVisible = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { useOrganizationVolunteersStore } from '~/stores/organizationVolunteers';
import VolunteersTable from '~/components/organization/VolunteersTable.vue';
import VolunteerDetailsModal from '~/components/organization/VolunteerDetailsModal.vue';
import type { OrganizationVolunteer } from '~/types';

// Define page metadata
definePageMeta({
  layout: 'organization',
});

// Initialize store
const volunteersStore = useOrganizationVolunteersStore();

// Modal state
const isModalVisible = ref(false);
const selectedVolunteer = ref<OrganizationVolunteer | null>(null);

// Load volunteers on mount
onMounted(async () => {
  await volunteersStore.fetchVolunteers();
});

// Open volunteer modal
const openVolunteerModal = (volunteer: OrganizationVolunteer) => {
  selectedVolunteer.value = volunteer;
  isModalVisible.value = true;
};

// SEO
useHead({
  title: 'Волонтери - Організація',
  meta: [{ name: 'description', content: 'Перегляд волонтерів, з якими працювала ваша організація' }],
});
</script>

<template>
  <div class="w-full h-full p-4 space-y-4">
    <div class="mb-4">
      <h1 class="text-2xl font-bold">Управління проектами</h1>
      <p class="text-gray-600">Перегляд та модерація проектів та подій організацій</p>
    </div>

    <Card class="w-full">
      <template #title>
        <div class="flex items-center gap-2">
          <i class="pi pi-briefcase"></i>
          <h2 class="text-xl font-semibold">Проекти / Події</h2>
        </div>
      </template>
      <template #subtitle>
        <div class="flex flex-col md:flex-row gap-3 md:items-end">
          <span class="p-input-icon-left w-full md:w-80">
            <i class="pi pi-search" />
            <InputText v-model="store.filters.search" placeholder="Пошук за назвою або організацією" class="w-full" />
          </span>
          <Dropdown class="w-full md:w-56" :options="statusOptions" optionLabel="label" optionValue="value" v-model="store.filters.status" placeholder="Статус" />
          <Dropdown class="w-full md:w-56" :options="cityOptions" v-model="store.filters.city" placeholder="Місто" />
          <Button label="Скинути" text @click="resetFilters" />
        </div>
      </template>
      <template #content>
        <DataTable :value="store.filtered" dataKey="id" :loading="store.isLoading" responsiveLayout="scroll" class="w-full" style="width: 100%">
          <Column field="title" header="Назва" />
          <Column field="organizationName" header="Організація" />
          <Column field="city" header="Місто" />
          <Column field="submittedAt" header="Подано">
            <template #body="{ data }">
              {{ formatDate(data.submittedAt) }}
            </template>
          </Column>
          <Column header="Статус">
            <template #body="{ data }">
              <Tag :value="statusLabel(data.status)" :severity="statusSeverity(data.status)" />
            </template>
          </Column>
          <Column header="Дії" style="width: 12rem">
            <template #body="{ data }">
              <div class="flex gap-2">
                <Button size="small" label="Переглянути" icon="pi pi-eye" @click="openReview(data)" />
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <ProjectReviewModal
      v-model:visible="drawer"
      :project="active"
      @approve="approve"
      @reject="onReject"
      @request="onRequest"
    />
  </div>
</template>

<script setup lang="ts">
import { useManagerProjectsStore } from '~/stores/manager-projects';
import ProjectReviewModal from '~/components/manager/ProjectReviewModal.vue';
import type { AdminProject } from '~/types/admin';

definePageMeta({ layout: 'manager' });
useHead({
  title: 'Управління проектами',
  meta: [
    { name: 'description', content: 'Перегляд та модерація проектів і подій організацій' },
  ],
});

const store = useManagerProjectsStore();
onMounted(() => store.load());

const drawer = ref(false);
const active = ref<AdminProject | null>(null);
const rejectText = ref('');
const requestText = ref('');

const statusOptions = [
  { label: 'Всі', value: 'All' },
  { label: 'Очікує', value: 'Pending' },
  { label: 'Схвалено', value: 'Approved' },
  { label: 'Відхилено', value: 'Rejected' },
  { label: 'Потрібна інформація', value: 'Needs Info' },
];
const cityOptions = computed(() => store.cities);

function resetFilters() { store.filters.status = 'All'; store.filters.city = null; store.filters.search = ''; }

function statusSeverity(s: AdminProject['status']) { return s==='Approved'?'success':s==='Rejected'?'danger':s==='Needs Info'?'warning':'info'; }

function statusLabel(s: AdminProject['status']) {
  if (s === 'Approved') return 'Схвалено';
  if (s === 'Rejected') return 'Відхилено';
  if (s === 'Needs Info') return 'Потрібна інформація';
  return 'Очікує';
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('uk-UA').format(new Date(iso));
  } catch {
    return iso;
  }
}

function openReview(p: AdminProject) { active.value = p; drawer.value = true; }

async function approve() { if (!active.value) return; await store.approve(active.value.id); drawer.value = false; }
async function onReject(reason: string) { if (!active.value || !reason) return; await store.reject(active.value.id, reason); drawer.value = false; }
async function onRequest(message: string) { if (!active.value || !message) return; await store.requestInfo(active.value.id, message); }
</script>

<style scoped>
</style>


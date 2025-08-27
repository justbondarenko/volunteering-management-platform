<template>
  <div class="h-full w-full">
    <div class="mb-4">
      <h1 class="text-2xl font-bold">Панель адміністратора</h1>
      <p class="text-gray-600">Огляд та управління організаціями і волонтерами на платформі</p>
    </div>

    <div class="grid auto-cols-fr grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
      <!-- Status summary cards -->
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <h2 class="mb-4 inline-flex items-center gap-4 text-xl font-semibold">
            Статистика організацій
            <NuxtLink to="/manager/organizations" class="inline-flex items-center gap-1 text-sm text-blue-500">
              Всі організації
              <i class="pi pi-chevron-right text-xs" />
            </NuxtLink>
          </h2>
        </div>
        <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card class="bg-blue-50">
            <template #content>
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold">Всього організацій</h3>
                  <p class="mt-2 text-3xl font-bold">{{ organizationsStore.getStatusCounts.total }}</p>
                </div>
                <i class="pi pi-building text-4xl text-blue-500"></i>
              </div>
            </template>
          </Card>

          <Card class="bg-green-50">
            <template #content>
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold">Активні</h3>
                  <p class="mt-2 text-3xl font-bold">{{ organizationsStore.getStatusCounts.active }}</p>
                </div>
                <i class="pi pi-check-circle text-4xl text-green-500"></i>
              </div>
            </template>
          </Card>

          <Card class="bg-yellow-50">
            <template #content>
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold">Очікують перевірки</h3>
                  <p class="mt-2 text-3xl font-bold">{{ organizationsStore.getStatusCounts.pending }}</p>
                </div>
                <i class="pi pi-clock text-4xl text-yellow-500"></i>
              </div>
            </template>
          </Card>

          <Card class="bg-red-50">
            <template #content>
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold">Призупинені</h3>
                  <p class="mt-2 text-3xl font-bold">
                    {{ organizationsStore.getStatusCounts.suspended + organizationsStore.getStatusCounts.inactive }}
                  </p>
                </div>
                <i class="pi pi-ban text-4xl text-red-500"></i>
              </div>
            </template>
          </Card>
        </div>
        <div class="flex flex-col gap-4"></div>
      </div>

      <!-- Volunteers statistics -->
      <div class="flex flex-col gap-4">
        <h2 class="mb-4 inline-flex items-center gap-4 text-xl font-semibold">
          Статистика волонтерів
          <NuxtLink to="/manager/volunteers" class="inline-flex items-center gap-1 text-sm text-blue-500">
            Всі волонтери
            <i class="pi pi-chevron-right text-xs" />
          </NuxtLink>
        </h2>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card class="bg-blue-50">
            <template #content>
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold">Всього волонтерів</h3>
                  <p class="mt-2 text-3xl font-bold">{{ volunteersStore.getStatusCounts.total }}</p>
                </div>
                <i class="pi pi-users text-4xl text-blue-500"></i>
              </div>
            </template>
          </Card>

          <Card class="bg-green-50">
            <template #content>
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold">Активні</h3>
                  <p class="mt-2 text-3xl font-bold">{{ volunteersStore.getStatusCounts.active }}</p>
                </div>
                <i class="pi pi-check-circle text-4xl text-green-500"></i>
              </div>
            </template>
          </Card>

          <Card class="bg-yellow-50">
            <template #content>
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold">Очікують перевірки</h3>
                  <p class="mt-2 text-3xl font-bold">{{ volunteersStore.getStatusCounts.pending }}</p>
                </div>
                <i class="pi pi-clock text-4xl text-yellow-500"></i>
              </div>
            </template>
          </Card>

          <Card class="bg-red-50">
            <template #content>
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold">Призупинені</h3>
                  <p class="mt-2 text-3xl font-bold">
                    {{ volunteersStore.getStatusCounts.suspended + volunteersStore.getStatusCounts.inactive }}
                  </p>
                </div>
                <i class="pi pi-ban text-4xl text-red-500"></i>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useManagerOrganizationsStore } from '~/stores/managerOrganizations';
import { useManagerVolunteersStore } from '~/stores/managerVolunteers';
import { useToast } from 'primevue/usetoast';

// Define page metadata
definePageMeta({
  layout: 'manager',
});

const toast = useToast();
const organizationsStore = useManagerOrganizationsStore();
const volunteersStore = useManagerVolunteersStore();
const router = useRouter();

// SEO
useHead({
  title: 'Панель адміністратора',
  meta: [{ name: 'description', content: 'Панель управління адміністратора платформи' }],
});
</script>

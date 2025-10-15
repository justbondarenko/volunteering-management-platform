<template>
  <div class="flex h-full w-full flex-col gap-4">
    <div class="mb-4">
      <h1 class="text-2xl font-bold">Панель адміністратора</h1>
      <p class="text-gray-600">Огляд та управління організаціями і волонтерами на платформі</p>
    </div>

    <Card>
      <template #content>
        <!-- Volunteers statistics -->
        <div class="flex flex-col gap-4">
          <h2 class="mb-4 inline-flex items-center gap-4 text-xl font-semibold">
            Волонтери
            <NuxtLink to="/manager/volunteers" class="inline-flex items-center gap-1 text-sm text-blue-500">
              Всі
              <i class="pi pi-chevron-right text-xs" />
            </NuxtLink>
          </h2>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card class="bg-blue-50">
              <template #content>
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-semibold">Всього</h3>
                    <div class="mt-2">
                      <Skeleton v-if="volunteersStore.isLoading" width="4rem" height="2rem" />
                      <p v-else class="text-3xl font-bold">{{ volunteersStore.getStatusCounts.total }}</p>
                    </div>
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
                    <div class="mt-2">
                      <Skeleton v-if="volunteersStore.isLoading" width="4rem" height="2rem" />
                      <p v-else class="text-3xl font-bold">{{ volunteersStore.getStatusCounts.active }}</p>
                    </div>
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
                    <div class="mt-2">
                      <Skeleton v-if="volunteersStore.isLoading" width="4rem" height="2rem" />
                      <p v-else class="text-3xl font-bold">{{ volunteersStore.getStatusCounts.pending }}</p>
                    </div>
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
                    <div class="mt-2">
                      <Skeleton v-if="volunteersStore.isLoading" width="4rem" height="2rem" />
                      <p v-else class="text-3xl font-bold">
                        {{ volunteersStore.getStatusCounts.suspended + volunteersStore.getStatusCounts.inactive }}
                      </p>
                    </div>
                  </div>
                  <i class="pi pi-ban text-4xl text-red-500"></i>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </template>
    </Card>

    <Card>
      <template #content>
          <!-- Organizations statistics -->
          <div class="flex flex-col gap-4">
            <h2 class="mb-4 inline-flex items-center gap-4 text-xl font-semibold">
              Організації
              <NuxtLink to="/manager/organizations" class="inline-flex items-center gap-1 text-sm text-blue-500">
                Всі
                <i class="pi pi-chevron-right text-xs" />
              </NuxtLink>
            </h2>
            <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
              <Card class="bg-blue-50">
                <template #content>
                  <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-semibold">Всього</h3>
                    <div class="mt-2">
                      <Skeleton v-if="organizationsStore.isLoading" width="4rem" height="2rem" />
                      <p v-else class="text-3xl font-bold">{{ organizationsStore.getStatusCounts.total }}</p>
                    </div>
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
                    <div class="mt-2">
                      <Skeleton v-if="organizationsStore.isLoading" width="4rem" height="2rem" />
                      <p v-else class="text-3xl font-bold">{{ organizationsStore.getStatusCounts.active }}</p>
                    </div>
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
                    <div class="mt-2">
                      <Skeleton v-if="organizationsStore.isLoading" width="4rem" height="2rem" />
                      <p v-else class="text-3xl font-bold">{{ organizationsStore.getStatusCounts.pending }}</p>
                    </div>
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
                    <div class="mt-2">
                      <Skeleton v-if="organizationsStore.isLoading" width="4rem" height="2rem" />
                      <p v-else class="text-3xl font-bold">
                        {{ organizationsStore.getStatusCounts.suspended + organizationsStore.getStatusCounts.inactive }}
                      </p>
                    </div>
                  </div>
                    <i class="pi pi-ban text-4xl text-red-500"></i>
                  </div>
                </template>
              </Card>
            </div>
          </div>
      </template>
    </Card>

    <Card>
      <template #content>
        <div class="flex flex-col gap-4">
          <h2 class="mb-4 inline-flex items-center gap-4 text-xl font-semibold">
            Проекти
            <NuxtLink to="/manager/projects" class="inline-flex items-center gap-1 text-sm text-blue-500">
              Всі
              <i class="pi pi-chevron-right text-xs" />
            </NuxtLink>
          </h2>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card class="bg-blue-50">
              <template #content>
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-semibold">Всього</h3>
                    <div class="mt-2">
                      <Skeleton v-if="projectsStore.isLoading" width="4rem" height="2rem" />
                      <p v-else class="text-3xl font-bold">{{ projectsStore.statusCounts.total }}</p>
                    </div>
                  </div>
                  <i class="pi pi-briefcase text-4xl text-blue-500"></i>
                </div>
              </template>
            </Card>
            <Card class="bg-yellow-50">
              <template #content>
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-semibold">Очікує</h3>
                    <div class="mt-2">
                      <Skeleton v-if="projectsStore.isLoading" width="4rem" height="2rem" />
                      <p v-else class="text-3xl font-bold">{{ projectsStore.statusCounts.pending }}</p>
                    </div>
                  </div>
                  <i class="pi pi-clock text-4xl text-yellow-500"></i>
                </div>
              </template>
            </Card>
            <Card class="bg-green-50">
              <template #content>
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-semibold">Схвалено</h3>
                    <div class="mt-2">
                      <Skeleton v-if="projectsStore.isLoading" width="4rem" height="2rem" />
                      <p v-else class="text-3xl font-bold">{{ projectsStore.statusCounts.approved }}</p>
                    </div>
                  </div>
                  <i class="pi pi-check-circle text-4xl text-green-500"></i>
                </div>
              </template>
            </Card>
            <Card class="bg-red-50">
              <template #content>
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-semibold">Відхилено</h3>
                    <div class="mt-2">
                      <Skeleton v-if="projectsStore.isLoading" width="4rem" height="2rem" />
                      <p v-else class="text-3xl font-bold">{{ projectsStore.statusCounts.rejected }}</p>
                    </div>
                  </div>
                  <i class="pi pi-times-circle text-4xl text-red-500"></i>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useManagerOrganizationsStore } from '~/stores/managerOrganizations';
import { useManagerVolunteersStore } from '~/stores/managerVolunteers';
import { useManagerProjectsStore } from '~/stores/manager-projects';
import { useToast } from 'primevue/usetoast';

// Define page metadata
definePageMeta({
  layout: 'manager',
});

const toast = useToast();
const organizationsStore = useManagerOrganizationsStore();
const volunteersStore = useManagerVolunteersStore();
const projectsStore = useManagerProjectsStore();
const router = useRouter();

// SEO
useHead({
  title: 'Панель адміністратора',
  meta: [{ name: 'description', content: 'Панель управління адміністратора платформи' }],
});

// No explicit loader for projects here; store self-initializes like others
</script>

<template>
  <div class="flex w-full h-full flex-col items-center p-4">
    <div class="w-full">
      <div v-if="projectsStore.isLoading && projectsStore.projects.length === 0" class="flex justify-center items-center py-8">
        <ProgressSpinner />
        <span class="ml-3">Завантаження проектів...</span>
      </div>

      <!-- Error state -->
      <div v-else-if="projectsStore.error && projectsStore.projects.length === 0" class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-600">{{ projectsStore.error }}</p>
        <Button label="Спробувати знову" severity="secondary" class="mt-3" @click="projectsStore.fetchProjects" />
      </div>

      <!-- Projects content -->
      <div v-else class="flex flex-col gap-6">
        <!-- Page header -->
        <Card>
          <template #content>
            <div class="flex items-center gap-3">
              <i class="pi pi-flag text-2xl text-primary"></i>
              <div>
                <h1 class="text-2xl font-bold">Проекти</h1>
                <p class="text-gray-600">Управління проектами та заходами вашої організації</p>
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
                  <i class="pi pi-flag text-blue-600 text-xl"></i>
                </div>
                <div>
                  <div class="text-2xl font-bold">{{ projectsStore.getTotalProjects }}</div>
                  <div class="text-sm text-gray-600">Всього проектів</div>
                </div>
              </div>
            </template>
          </Card>

          <Card>
            <template #content>
              <div class="flex items-center gap-3">
                <div class="p-3 bg-green-100 rounded-full">
                  <i class="pi pi-play text-green-600 text-xl"></i>
                </div>
                <div>
                  <div class="text-2xl font-bold">{{ projectsStore.getActiveProjects }}</div>
                  <div class="text-sm text-gray-600">Активних проектів</div>
                </div>
              </div>
            </template>
          </Card>

          <Card>
            <template #content>
              <div class="flex items-center gap-3">
                <div class="p-3 bg-purple-100 rounded-full">
                  <i class="pi pi-users text-purple-600 text-xl"></i>
                </div>
                <div>
                  <div class="text-2xl font-bold">{{ projectsStore.getTotalVolunteersEngaged }}</div>
                  <div class="text-sm text-gray-600">Волонтерів залучено</div>
                </div>
              </div>
            </template>
          </Card>
        </div>

        <!-- Projects table -->
        <Card>
          <template #title>
            <div class="flex items-center gap-2">
              <i class="pi pi-table"></i>
              <h2 class="text-xl font-semibold">Список проектів</h2>
            </div>
          </template>
          <template #content>
            <ProjectsTable 
              :projects="projectsStore.projectsWithStatus" 
              :loading="projectsStore.isLoading"
              @view-project="openProjectModal"
            />
          </template>
        </Card>
      </div>
    </div>

    <!-- Project details modal -->
    <ProjectDetailsModal 
      :visible="isModalVisible" 
      :project="selectedProject"
      @update:visible="isModalVisible = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { useOrganizationProjectsStore } from '~/stores/organizationProjects';
import ProjectsTable from '~/components/organization/ProjectsTable.vue';
import ProjectDetailsModal from '~/components/organization/ProjectDetailsModal.vue';
import type { OrganizationProject } from '~/types';

// Define page metadata
definePageMeta({
  layout: 'organization',
});

// Initialize store
const projectsStore = useOrganizationProjectsStore();

// Modal state
const isModalVisible = ref(false);
const selectedProject = ref<OrganizationProject | null>(null);

// Load projects on mount
onMounted(async () => {
  await projectsStore.fetchProjects();
});

// Open project modal
const openProjectModal = (project: OrganizationProject) => {
  selectedProject.value = project;
  isModalVisible.value = true;
};

// SEO
useHead({
  title: 'Проекти - Організація',
  meta: [{ name: 'description', content: 'Управління проектами та заходами вашої організації' }],
});
</script>

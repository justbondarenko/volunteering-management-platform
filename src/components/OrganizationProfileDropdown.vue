<template>
  <div>
    <Button
      :label="orgDisplayName"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="org-user-menu"
      severity="secondary"
      text
    >
      <template #icon>
        <i class="pi pi-building"></i>
      </template>
    </Button>

    <Popover ref="popover" id="org-user-menu">
      <div class="flex flex-col gap-2 p-2 w-56">
        <div class="text-lg font-medium mb-2 border-b pb-2 text-left">{{ orgDisplayName }}</div>
        <div class="text-sm text-gray-600 mb-2 text-left">{{ orgEmail }}</div>

        <div class="flex flex-col gap-1">
          <NuxtLink 
            to="/organizations/projects" 
            class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            <i class="pi pi-flag mr-2"></i>Проекти
          </NuxtLink>

          <NuxtLink 
            to="/organizations/profile" 
            class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            <i class="pi pi-building mr-2"></i>Профіль
          </NuxtLink>

          <NuxtLink 
            to="/organizations/settings" 
            class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            <i class="pi pi-cog mr-2"></i>Налаштування
          </NuxtLink>
        </div>

        <div class="border-t pt-2 mt-2">
          <Button 
            @click="logout" 
            severity="danger" 
            text 
            class="justify-start w-full"
          >
            <i class="pi pi-sign-out mr-2"></i>Вийти
          </Button>
        </div>
      </div>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { useOrganizationStore } from '~/stores/organization';

const popover = ref();
const router = useRouter();
const organizationStore = useOrganizationStore();

const orgDisplayName = computed(() => organizationStore.organization?.name || 'Організація');
const orgEmail = computed(() => organizationStore.organization?.email || '');

const toggle = (event: MouseEvent) => {
  popover.value.toggle(event);
};

const logout = () => {
  organizationStore.logout();
  popover.value.hide();
  router.push('/');
};
</script>

<style scoped></style>



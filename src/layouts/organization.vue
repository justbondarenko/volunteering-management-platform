<template>
  <div class="flex h-full w-full flex-col overflow-hidden bg-slate-50">
    <AppToolbar />
    <div class="flex h-full w-full items-start justify-start overflow-hidden">
      <div class="flex h-full flex-col items-start justify-between bg-white p-4">
        <OrganizationMenu />
        <Button label="Вихід" @click="logout" severity="secondary" icon="pi pi-sign-out" class="w-full" text />
      </div>
      <div class="flex h-full w-full overflow-y-auto p-4">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppToolbar from '~/components/AppToolbar.vue';
import OrganizationMenu from '~/components/profile/OrganizationMenu.vue';

const router = useRouter();
const organizationStore = useOrganizationStore();
const logout = () => {
  organizationStore.logout();
  router.push('/')
};
</script>

<template>
  <div class="flex flex-col w-full h-full bg-slate-50 overflow-hidden">
    <AppToolbar />
    <div class="h-full w-full p-4 overflow-y-auto">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppToolbar from "~/components/AppToolbar.vue";

// Initialize volunteer store to ensure login state is preserved
const volunteerStore = useVolunteerStore();
const organizationStore = useOrganizationStore();
const managerAuth = useManagerAuthStore();

// Ensure the store is properly initialized
onMounted(() => {
  volunteerStore.initializeAuth?.();
  organizationStore.initializeAuth?.();
  managerAuth.initializeAuth?.();
});
</script>

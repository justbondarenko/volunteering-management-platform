<template>
  <div class="flex h-full w-full flex-col overflow-hidden bg-slate-50">
    <AppToolbar />
    <div class="flex h-full w-full items-start justify-start overflow-hidden">
      <div class="flex h-full flex-col items-start justify-between bg-white p-4">
        <ProfileMenu />
        <Button label="Logout" @click="logout" severity="secondary" icon="pi pi-sign-out" class="w-full" text />
      </div>
      <div class="flex h-full w-full overflow-y-auto p-4">
        <div v-if="isLoading" class="flex h-full w-full items-center justify-center">
          <ProgressSpinner />
        </div>
        <NuxtPage v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppToolbar from '~/components/AppToolbar.vue';
import ProfileMenu from '~/components/profile/ProfileMenu.vue';

const router = useRouter();
const volunteerStore = useVolunteerStore();

// Show loading state while checking authentication
const isLoading = ref(true);

// Check authentication status
onMounted(() => {
  // Small delay to prevent flash
  setTimeout(() => {
    if (!volunteerStore.isLoggedIn) {
      router.push('/volunteers/login');
    } else {
      isLoading.value = false;
    }
  }, 100);
});

const logout = () => {
  volunteerStore.logout();
  router.push('/');
};
</script>

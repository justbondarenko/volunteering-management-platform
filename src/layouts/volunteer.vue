<template>
  <div class="flex h-full w-full flex-col overflow-hidden bg-slate-50">
    <AppToolbar />
    <div class="flex h-full w-full items-start justify-start overflow-hidden">
      <div class="flex h-full flex-col items-start justify-between bg-white p-4">
        <ProfileMenu />
        <Button label="Logout" @click="logout" severity="secondary" icon="pi pi-sign-out" class="w-full" text />
      </div>
      <div class="flex h-full w-full overflow-y-auto p-4">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppToolbar from '~/components/AppToolbar.vue';
import ProfileMenu from '~/components/profile/ProfileMenu.vue';
const router = useRouter();
const logout = () => {
  router.push('/volunteers/login');
};
</script>

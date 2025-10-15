<template>
  <Toolbar>
    <template #start>
      <NuxtLink to="/" class="flex items-center gap-2 text-gray-700">
        <Logo />
        <span class="text-2xl font-bold">Назва Організації</span>
      </NuxtLink>
    </template>

    <template #end>
      <ManagerProfileDropdown v-if="isManagerLoggedIn" />
      <OrganizationProfileDropdown v-else-if="isOrganizationLoggedIn" />
      <UserProfileDropdown v-else-if="isVolunteerLoggedIn" />
      <LoginButton v-else />
    </template>
  </Toolbar>
</template>

<script setup lang="ts">
import LoginButton from "./LoginButton.vue";
import UserProfileDropdown from "./UserProfileDropdown.vue";
import ManagerProfileDropdown from "./ManagerProfileDropdown.vue";
import { useVolunteerStore } from '~/stores/volunteer';
import { useOrganizationStore } from '~/stores/organization';
import { useManagerAuthStore } from '~/stores/manager-auth';

const volunteerStore = useVolunteerStore();
const organizationStore = useOrganizationStore();
const managerAuth = useManagerAuthStore();

// Computed properties for login state per role
const isVolunteerLoggedIn = computed(() => volunteerStore.isLoggedIn);
const isOrganizationLoggedIn = computed(() => organizationStore.isLoggedIn);
const isManagerLoggedIn = computed(() => managerAuth.isLoggedIn);

const items = ref([
  {
    label: "Організаціям",
    href: "/for-organizations",
  },
  {
    label: "Волонтерам",
    href: "/for-volunteers",
  },
  {
    label: "Про нас",
    href: "/about",
  },
  {
    label: "Контакти",
    href: "/contacts",
  },
]);
</script>

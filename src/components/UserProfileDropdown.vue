<template>
  <div>
    <Button
      :label="userDisplayName"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="user-menu"
      severity="secondary"
      text
    >
      <template #icon>
        <i class="pi pi-user"></i>
      </template>
    </Button>

    <Popover ref="popover" id="user-menu">
      <div class="flex flex-col gap-2 p-2 w-56">
        <div class="text-lg font-medium mb-2 border-b pb-2 text-left">{{ userDisplayName }}</div>
        <div class="text-sm text-gray-600 mb-2 text-left">{{ userEmail }}</div>
        
        <div class="flex flex-col gap-1">
          <NuxtLink 
            to="/volunteers/events" 
            class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            <i class="pi pi-calendar mr-2"></i>Події
          </NuxtLink>
          
          <NuxtLink 
            to="/volunteers/profile" 
            class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            <i class="pi pi-user mr-2"></i>Профіль
          </NuxtLink>
          
          <NuxtLink 
            to="/volunteers/settings" 
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
import { useVolunteerStore } from '~/stores/volunteer';

const popover = ref();
const router = useRouter();
const volunteerStore = useVolunteerStore();

// Computed properties for user info
const userDisplayName = computed(() => {
  if (volunteerStore.volunteer) {
    return `${volunteerStore.volunteer.firstName} ${volunteerStore.volunteer.lastName}`;
  }
  return 'Користувач';
});
const userEmail = computed(() => volunteerStore.volunteer?.email || '');

const toggle = (event: MouseEvent) => {
  popover.value.toggle(event);
};

const logout = () => {
  volunteerStore.logout();
  popover.value.hide();
  router.push('/');
};
</script>

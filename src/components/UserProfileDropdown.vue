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
        
        <ProfileMenu @click="onClick" />
        
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
import ProfileMenu from './profile/ProfileMenu.vue';

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

const onClick = () => {
  popover.value.hide();
};

const logout = () => {
  volunteerStore.logout();
  popover.value.hide();
  router.push('/');
};
</script>

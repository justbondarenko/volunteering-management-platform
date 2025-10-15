<template>
  <div>
    <Button
      :label="managerName"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="manager-user-menu"
      severity="secondary"
      text
    >
      <template #icon>
        <i class="pi pi-shield"></i>
      </template>
    </Button>

    <Popover ref="popover" id="manager-user-menu">
      <div class="flex flex-col gap-2 p-2 w-56">
        <div class="text-lg font-medium mb-2 border-b pb-2 text-left">{{ managerName }}</div>
        <div class="text-sm text-gray-600 mb-2 text-left">{{ managerEmail }}</div>

        <ManagerMenu @click="onClick" />

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
import { useManagerAuthStore } from '~/stores/manager-auth';
import ManagerMenu from './manager/ManagerMenu.vue';
const popover = ref();
const router = useRouter();
const managerAuth = useManagerAuthStore();

const managerName = computed(() => managerAuth.manager?.name || 'Менеджер');
const managerEmail = computed(() => managerAuth.manager?.email || '');

const toggle = (event: MouseEvent) => {
  popover.value.toggle(event);
};

const onClick = () => {
  popover.value.hide();
};


const logout = () => {
  managerAuth.logout();
  popover.value.hide();
  router.push('/');
};
</script>

<style scoped></style>



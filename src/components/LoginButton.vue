<template>
  <div>
    <Button label="Вхід" @click="toggle" aria-haspopup="true" aria-controls="login-options">
      <template #icon>
        <i class="pi pi-sign-in"></i>
      </template>
    </Button>

    <Popover ref="popover" id="login-options">
      <div class="flex w-48 flex-col gap-2 p-2">
        <div class="mb-2 text-lg font-medium">Увійти як</div>
        <Button v-slot="slotProps" @click="navigateTo('/organizations/login')">
            <i class="pi pi-building mr-2"></i>
            Організація
        </Button>
        <Button v-slot="slotProps" @click="navigateTo('/volunteers/login')">
            <i class="pi pi-user mr-2"></i>
            Волонтер
        </Button>
        <Button v-slot="slotProps" @click="navigateTo('/manager/login')"    >
            <i class="pi pi-cog mr-2"></i>
            Менеджер
        </Button>
      </div>
    </Popover>
  </div>
</template>

<script setup lang="ts">
const popover = ref();
const router = useRouter();

const toggle = (event: MouseEvent) => {
  popover.value.toggle(event);
};

const navigateTo = (path: string) => {
  router.push(path);
  popover.value.hide();
};
</script>

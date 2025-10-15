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
        <Button asChild v-slot="slotProps">
          <RouterLink to="/organizations/login" :class="slotProps.class">
            <i class="pi pi-building mr-2"></i>
            Організація
          </RouterLink>
        </Button>
        <Button asChild v-slot="slotProps">
          <RouterLink to="/volunteers/login" :class="slotProps.class">
            <i class="pi pi-user mr-2"></i>
            Волонтер
          </RouterLink>
        </Button>
        <Button asChild v-slot="slotProps">
          <RouterLink to="/manager/login" :class="slotProps.class">
            <i class="pi pi-cog mr-2"></i>
            Менеджер
          </RouterLink>
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
  popover.value.hide();
  router.push(path);
};
</script>

<template>
  <div class="card flex justify-center">
    <Menu :model="items" />
  </div>
</template>

<script setup lang="ts">
import Menu from 'primevue/menu';
import type { MenuItem } from 'primevue/menuitem';
const router = useRouter();
const items = ref([
  {
    label: 'Дашборд',
    icon: 'pi pi-chart-bar',
    command: () => router.push('/manager/dashboard')
  },
  {
    label: 'Організації',
    icon: 'pi pi-building',
    command: () => router.push('/manager/organizations')
  },
  {
    label: 'Волонтери',
    icon: 'pi pi-users',
    command: () => router.push('/manager/volunteers')
  },
  {
    label: 'Проекти',
    icon: 'pi pi-flag',
    command: () => router.push('/manager/projects'),
    disabled: true
  },
  {
    label: 'Налаштування',
    icon: 'pi pi-cog',
    command: () => router.push('/manager/settings'),
    disabled: true
  }
]) as Ref<MenuItem[]>;
</script>

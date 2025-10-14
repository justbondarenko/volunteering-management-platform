<template>
  <div class="card flex justify-center">
    <Menu :model="items" />
  </div>
</template>

<script setup lang="ts">
const items = ref([
  {
    label: 'Проекти',
    icon: 'pi pi-flag',
    to: '/organizations/projects',
    disabled: true
  },
  {
    label: 'Профіль',
    icon: 'pi pi-building',
    to: '/organizations/profile'
  },
  {
    label: 'Волонтери',
    icon: 'pi pi-users',
    to: '/organizations/volunteers',
    disabled: false
  },
  {
    label: 'Налаштування',
    icon: 'pi pi-cog',
    to: '/organizations/settings',
    disabled: true
  }
]);
</script>

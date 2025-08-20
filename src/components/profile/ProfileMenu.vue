<template>
   <div class="card flex justify-center">
      <Menu :model="items" />
    </div>
</template>

<script setup lang="ts">
const items = ref([
  {
    label: 'Events (soon...)',
    icon: 'pi pi-calendar',
    to: '/volunteers/events',
    disabled: true
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    to: '/volunteers/profile'
  },
  {
    label: 'Settings (soon...)',
    icon: 'pi pi-cog',
    to: '/volunteers/settings',
    disabled: true
  }
]);
</script>
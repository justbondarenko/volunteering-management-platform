<template>
  <div class="card flex justify-center">
    <Menu :model="items">
      <template #item="{ item, props }">
        <NuxtLink v-if="item.to" v-slot="{ href, navigate }" :to="item.to" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate" class="align-items-center p-link flex">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </NuxtLink>
        <a v-else v-ripple v-bind="props.action" class="align-items-center p-link flex">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
    </Menu>
  </div>
</template>

<script setup lang="ts">
const items = ref([
  {
    label: 'Проекти',
    icon: 'pi pi-flag',
    to: '/organizations/projects',
  },
  {
    label: 'Профіль',
    icon: 'pi pi-building',
    to: '/organizations/profile',
  },
  {
    label: 'Волонтери',
    icon: 'pi pi-users',
    to: '/organizations/volunteers',
  },
  {
    label: 'Налаштування',
    icon: 'pi pi-cog',
    to: '/organizations/settings',
  },
]);
</script>

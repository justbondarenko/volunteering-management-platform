<template>
  <div class="card flex justify-center">
    <Menu :model="items">
      <template #item="{ item, props }">
        <NuxtLink v-if="item.to" v-slot="{ href, navigate }" :to="item.to" custom @click="emits('click')">
          <a v-ripple :href="href" v-bind="props.action" @click="navigate" class="flex align-items-center p-link">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </NuxtLink>
        <a v-else v-ripple v-bind="props.action" class="flex align-items-center p-link" @click="emits('click')">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import Menu from 'primevue/menu';
import type { MenuItem } from 'primevue/menuitem';
const emits = defineEmits(['click']);
const items = ref([
  {
    label: 'Дашборд',
    icon: 'pi pi-chart-bar',
    to:'/manager'
  },
  {
    label: 'Організації',
    icon: 'pi pi-building',
    to:'/manager/organizations'
  },
  {
    label: 'Волонтери',
    icon: 'pi pi-users',
    to:'/manager/volunteers'
  },
  {
    label: 'Проекти',
    icon: 'pi pi-flag',
    to: '/manager/projects',
  },
  {
    label: 'Налаштування',
    icon: 'pi pi-cog',
    to: '/manager/settings'
  }
]) as Ref<MenuItem[]>;
</script>

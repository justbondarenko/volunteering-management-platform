<template>
   <div class="card flex justify-center">
      <Menu :model="items">
        <template #item="{ item, props }">
          <NuxtLink v-if="item.to" v-slot="{ href, navigate }" :to="item.to" custom>
            <a v-ripple :href="href" v-bind="props.action" @click="navigate" class="flex align-items-center p-link">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </NuxtLink>
          <a v-else v-ripple v-bind="props.action" class="flex align-items-center p-link">
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
    label: 'Events',
    icon: 'pi pi-calendar',
    to: '/volunteers/events'
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    to: '/volunteers/profile'
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    to: '/volunteers/settings'
  }
]);
</script>
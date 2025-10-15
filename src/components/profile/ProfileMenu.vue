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
const emits = defineEmits(['click']);
const items = ref([
  {
    label: 'Події',
    icon: 'pi pi-calendar',
    to: '/volunteers/events'
  },
  {
    label: 'Профіль',
    icon: 'pi pi-user',
    to: '/volunteers/profile'
  },
  {
    label: 'Налаштування',
    icon: 'pi pi-cog',
    to: '/volunteers/settings'
  }
]);
</script>
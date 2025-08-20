<template>
  <Toolbar>
    <template #start>
      <NuxtLink to="/" class="flex items-center gap-2 text-gray-700">
        <Logo />
        <span class="text-2xl font-bold">Назва Організації</span>
      </NuxtLink>
    </template>

    <!-- <template #center>
      <div class="flex items-center gap-6 pr-10">
        <a
          v-for="item in items"
          :key="item.label"
          :href="item.href"
          class="text-lg font-bold text-gray-700"
          >{{ item.label }}</a
        >
      </div>
    </template> -->
    <template #end>
      <LoginButton />
    </template>
  </Toolbar>
</template>

<script setup lang="ts">
import LoginButton from "./LoginButton.vue";

const items = ref([
  {
    label: "Організаціям",
    href: "/for-organizations",
  },
  {
    label: "Волонтерам",
    href: "/for-volunteers",
  },
  {
    label: "Про нас",
    href: "/about",
  },
  {
    label: "Контакти",
    href: "/contacts",
  },
]);
</script>

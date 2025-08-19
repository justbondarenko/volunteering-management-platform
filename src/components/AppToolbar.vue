<template>
  <Toolbar>
    <template #start>
      <div class="flex items-center gap-2">
        <Logo />
        <span class="text-2xl font-bold">Назва Організації</span>
      </div>
    </template>

    <template #end>
      <div class="flex items-center gap-6 pr-10">
        <a v-for="item in items" :key="item.label" :href="item.href" class="text-lg font-bold text-gray-700">{{ item.label }}</a>
      </div>
    </template>
  </Toolbar>
</template>

<script setup lang="ts">
const items = ref([
  {
    label: "Організації",
    href: "/organizations",
  },
  {
    label: "Як це працює?",
    href: "/how-it-works",
  },
  {
    label: "Про нас",
    href: "/about",
  },
  {
    label: "Контакти",
    href: "/contacts",
  }
]);
</script>

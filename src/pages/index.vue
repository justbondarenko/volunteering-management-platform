<template>
  <div class="flex w-full h-full flex-col p-4 gap-4 bg-slate-50">
    <HomepageCarousel />
    <EventsFeed />
    <HowItWorks />
    <ContactUs />
  </div>
</template>


<script setup lang="ts">
import HomepageCarousel from "~/components/homepage/HomepageCarousel.vue";
import EventsFeed from "~/components/homepage/EventsFeed.vue";
import HowItWorks from "~/components/HowItWorks.vue";
import ContactUs from "~/components/ContactUs.vue";

definePageMeta({
  layout: "default",
});
</script>
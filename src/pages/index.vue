<template>
  <div class="flex w-full h-full flex-col p-4 gap-4 bg-slate-50">
    <!-- Welcome message for logged in users -->
    <div v-if="isAnyUserLoggedIn" class="bg-white rounded-lg shadow-sm p-6 mb-4">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">
        {{ welcomeMessage }}
      </h1>
      <p class="text-gray-600">
        {{ welcomeSubtext }}
      </p>
    </div>
    
    <!-- Carousel for non-logged in users -->
    <HomepageCarousel v-else />
    
    <EventsFeed />
    <HowItWorks v-if="!isAnyUserLoggedIn" />
    <ContactUs v-if="!isAnyUserLoggedIn" />
  </div>
</template>


<script setup lang="ts">
import HomepageCarousel from "~/components/homepage/HomepageCarousel.vue";
import EventsFeed from "~/components/homepage/EventsFeed.vue";
import HowItWorks from "~/components/HowItWorks.vue";
import ContactUs from "~/components/ContactUs.vue";

// Get login status from all stores
const volunteerStore = useVolunteerStore();
const organizationStore = useOrganizationStore();
const managerStore = useManagerAuthStore();

// Computed property to check if any user is logged in
const isAnyUserLoggedIn = computed(() => {
  return volunteerStore.isLoggedIn || organizationStore.isLoggedIn || managerStore.isLoggedIn;
});

// Computed property for welcome message
const welcomeMessage = computed(() => {
  if (volunteerStore.isLoggedIn && volunteerStore.volunteer) {
    return `Вітаємо, ${volunteerStore.fullName}!`;
  } else if (organizationStore.isLoggedIn && organizationStore.organization) {
    return `Вітаємо, ${organizationStore.organization.name}!`;
  }
  return '';
});

// Computed property for welcome subtext
const welcomeSubtext = computed(() => {
  if (volunteerStore.isLoggedIn) {
    return 'Дякуємо за вашу активність у волонтерських проектах!';
  } else if (organizationStore.isLoggedIn) {
    return 'Дякуємо за вашу роботу з волонтерами та створення позитивних змін!';
  }
  return '';
});

definePageMeta({
  layout: "default",
});
</script>
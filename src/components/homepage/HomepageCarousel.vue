<template>
  <div class="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-5 items-center w-full gap-4">
    <div
      class="rounded-lg relative w-full  bg-gray-200 overflow-hidden h-[350px] col-span-4 md:col-span-4 2xl:col-span-3"
    >
      <div
        class="w-fit flex flex-col items-end justify-center absolute top-1/2 -right-20 -translate-y-1/2 -translate-x-1/2 z-10 gap-4"
      >
        <span class="text-6xl font-bold w-fit text-white drop-shadow-lg"
          >Допомогай!</span
        >
        <Button label="Приєднатись" size="large" class="w-fit" @click="navigateToVolunteerLogin" />
      </div>
      <Carousel
        :value="slides"
        :numVisible="1"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        :showNavigators="false"
        :showIndicators="false"
        :circular="true"
        :autoplayInterval="6000"
      >
        <template #item="slotProps">
          <img
            :src="slotProps.data.image"
            :alt="slotProps.data.name"
            class="max-h-full w-full object-cover"
          />
        </template>
      </Carousel>
    </div>
    <div class="w-full flex flex-col items-end gap-4 h-full rounded-lg p-10 bg-slate-800 text-white text-balanced col-span-4 md:col-span-2 2xl:col-span-1">
      <span class="text-4xl font-bold text-left w-full">Організаціям</span>
      <span class="text-xl w-full">
        Ми допомагаємо організаціям знайти волонтерів для своїх проектів.
      </span>
      <Button label="Створити подію" size="large" severity="secondary" class="w-fit mr-0 mt-auto mb-0" @click="navigateToOrganizationLogin" />
    </div>
    <div class="w-full flex flex-col items-end gap-4 h-full rounded-lg p-10 bg-orange-800 text-white text-balanced col-span-4 md:col-span-2 2xl:col-span-1">
      <span class="text-4xl font-bold text-left w-full">Волонтерам</span>
      <span class="text-xl w-full">
        Ми допомагаємо волонтерам знайти подію для себе.
      </span>
      <Button label="Знайти подію" size="large" severity="secondary" class="w-fit mr-0 mt-auto mb-0" @click="navigateToVolunteerEvents" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Carousel from "primevue/carousel";
import Button from "primevue/button";

const router = useRouter();
const organizationStore = useOrganizationStore();
const volunteerStore = useVolunteerStore();

const slides = ref(
  Array.from({ length: 4 }, (_, i) => ({
    image: `/homepage/slide-${i + 1}.jpg`,
    name: `Slide ${i + 1}`,
  }))
);

const responsiveOptions = ref([
  {
    breakpoint: "1199px",
    numVisible: 1,
    numScroll: 1,
  },
]);

// Navigation functions with authentication check
const navigateToVolunteerLogin = () => {
  // Check if volunteer is already logged in
  if (volunteerStore.isLoggedIn) {
    // If logged in, go to volunteer profile/dashboard
    router.push('/volunteers/profile');
  } else {
    // If not logged in, go to volunteer login
    router.push('/volunteers/login');
  }
};

const navigateToOrganizationLogin = () => {
  // Check if organization is already logged in
  if (organizationStore.isLoggedIn) {
    // If logged in, go to organization profile/dashboard
    router.push('/organizations/profile');
  } else {
    // If not logged in, go to organization login
    router.push('/organizations/login');
  }
};

const navigateToVolunteerEvents = () => {
  // Check if volunteer is already logged in
  if (volunteerStore.isLoggedIn) {
    // If logged in, go to volunteer events
    router.push('/volunteers/events');
  } else {
    // If not logged in, go to volunteer login
    router.push('/volunteers/login');
  }
};
</script>

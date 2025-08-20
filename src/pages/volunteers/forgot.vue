<template>
  <div class="flex h-full w-full flex-col items-center justify-start bg-slate-50 p-4">
    <Card class="w-full max-w-md shadow-lg">
      <template #title>
        <div class="mb-4 inline-flex items-center justify-center gap-2">
          <i class="pi pi-user"></i>
          <h1 class="text-center text-2xl font-bold">Відновлення паролю</h1>
        </div>
      </template>
      <template #content>
        <div v-if="!emailSent" class="flex flex-col gap-4">
          <p class="text-gray-600">
            Введіть email, який ви використовували при реєстрації. Ми надішлемо вам інструкції для відновлення паролю.
          </p>
          <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label for="email" class="font-medium">Email</label>
              <InputText
                id="email"
                v-model="email"
                type="email"
                placeholder="your@email.com"
                :class="{ 'p-invalid': error !== '' }"
                aria-describedby="email-error"
                fluid
              />
              <small id="email-error" class="text-red-500" v-if="error">
                {{ error }}
              </small>
            </div>

            <Button
              type="submit"
              label="Відправити інструкції"
              class="mt-2 w-full"
              :loading="isLoading"
              :disabled="isLoading"
            />
          </form>
        </div>
        <div v-else class="flex flex-col gap-4 items-center">
          <div class="flex items-center justify-center mb-4 text-green-600">
            <i class="pi pi-check-circle text-5xl"></i>
          </div>
          <h2 class="text-xl font-semibold text-center">Інструкції відправлено</h2>
          <p class="text-gray-600 text-center">
            Ми надіслали інструкції для відновлення паролю на вашу електронну пошту. Будь ласка, перевірте свою поштову скриньку та дотримуйтесь інструкцій.
          </p>
        </div>
      </template>
      <template #footer>
        <div class="text-center">
          <p class="text-sm text-gray-600">
            <NuxtLink to="/volunteers/login" class="text-blue-600 hover:underline">
              Повернутися до входу
            </NuxtLink>
          </p>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';
const toast = useToast();

definePageMeta({
  layout: "default",
});

// Form state
const email = ref('');
const error = ref('');
const isLoading = ref(false);
const emailSent = ref(false);

// Form validation schema using Zod
const schema = z.object({
  email: z.string().email('Введіть дійсну email адресу').min(1, "Email обов'язковий"),
});

// Submit handler
const handleSubmit = async () => {
  // Reset error
  error.value = '';

  // Validate form
  try {
    schema.parse({ email: email.value });
  } catch (err) {
    if (err instanceof z.ZodError) {
      const zodErrors = err.format();
      if (zodErrors.email?._errors?.length) {
        error.value = zodErrors.email._errors[0];
      }
      return;
    }
  }

  try {
    isLoading.value = true;

    // TODO: Implement actual password reset API call here
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

    // Example reset password logic (replace with actual API integration)
    // const response = await $fetch('/api/volunteers/forgot-password', {
    //   method: 'POST',
    //   body: {
    //     email: email.value
    //   }
    // });

    // Show success state
    emailSent.value = true;
  } catch (error) {
    // Handle errors
    toast?.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Не вдалося відправити інструкції. Спробуйте ще раз.',
      life: 5000,
    });
  } finally {
    isLoading.value = false;
  }
};

// SEO
useHead({
  title: 'Відновлення паролю волонтера',
  meta: [{ name: 'description', content: 'Відновлення паролю для облікового запису волонтера' }],
});
</script>

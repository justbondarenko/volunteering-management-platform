<template>
  <div class="flex h-full w-full flex-col items-center justify-start bg-slate-50 p-4">
    <Card class="w-full max-w-md shadow-lg">
      <template #title>
        <div class="mb-4 inline-flex items-center justify-center gap-2">
          <i class="pi pi-building"></i>
          <h1 class="text-center text-2xl font-bold">Вхід для організацій</h1>
        </div>
      </template>
      <template #content>
        <!-- TODO: REMOVE THIS WHEN WE HAVE REAL LOGIN -->
        <Message severity="info" icon="pi pi-code" class="mb-4">
          Це тестова сторінка, використовуйте ці облікові дані для входу:
          <br />
          Email:
          <code>organization@example.com</code>
          <i class="ml-2 pi pi-copy hover:cursor-pointer" @click="copyToClipboard('organization@example.com')" />
          <br />
          Пароль:
          <code>password123</code>
          <i class="ml-2 pi pi-copy hover:cursor-pointer" @click="copyToClipboard('password123')" />
        </Message>
        <Message v-if="apiError" severity="error" icon="pi pi-exclamation-triangle" class="mb-4">
          {{ apiError }}
        </Message>
        <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label for="email" class="font-medium">Email</label>
            <InputText
              id="email"
              v-model="email"
              type="email"
              placeholder="your@email.com"
              :class="{ 'p-invalid': errors.email !== '' || !!apiError }"
              aria-describedby="email-error"
            />
            <small id="email-error" class="text-red-500" v-if="errors.email">
              {{ errors.email }}
            </small>
          </div>

          <div class="flex flex-col gap-2">
            <label for="password" class="font-medium">Пароль</label>
            <Password
              id="password"
              v-model="password"
              :feedback="false"
              fluid
              toggleMask
              class="w-full"
              :class="{ 'p-invalid': errors.password !== '' || !!apiError }"
              aria-describedby="password-error"
              placeholder="Введіть пароль"
            />
            <small id="password-error" class="text-red-500" v-if="errors.password">
              {{ errors.password }}
            </small>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <Checkbox v-model="rememberMe" inputId="rememberMe" :binary="true" />
              <label for="rememberMe" class="ml-2 text-sm">Запам'ятати мене</label>
            </div>
            <NuxtLink to="/organizations/forgot" class="text-sm text-blue-600 hover:underline">Забули пароль?</NuxtLink>
          </div>

          <Button type="submit" label="Увійти" class="mt-2 w-full" :loading="isLoading" :disabled="isLoading" />
        </form>
      </template>
      <template #footer>
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Ще не зареєстровані?
            <NuxtLink to="/organizations/signup" class="text-blue-600 hover:underline">Створити акаунт</NuxtLink>
          </p>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';
import Message from 'primevue/message';
import { copyToClipboard } from '~/lib/utils';
import { useOrganizationStore } from '~/stores/organization';

const toast = useToast();
const organizationStore = useOrganizationStore();
const apiError = ref('');

definePageMeta({
  layout: 'default',
});

// Form state
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const isLoading = ref(false);
const router = useRouter();

// Form validation schema using Zod
const loginSchema = z.object({
  email: z.string().email('Введіть дійсну email адресу').min(1, "Email обов'язковий"),
  password: z.string().min(6, 'Пароль має містити щонайменше 6 символів'),
});

// Form errors
const errors = ref({
  email: '',
  password: '',
});

// Login handler
const handleLogin = async () => {
  // Reset errors
  errors.value = {
    email: '',
    password: '',
  };

  // Validate form
  try {
    loginSchema.parse({
      email: email.value,
      password: password.value,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      const zodErrors = err.format();
      Object.keys(zodErrors).forEach((key) => {
        if (key === 'email' && zodErrors[key]?._errors?.length) {
          errors.value.email = zodErrors[key]._errors[0];
        }
        if (key === 'password' && zodErrors[key]?._errors?.length) {
          errors.value.password = zodErrors[key]._errors[0];
        }
      });
      return;
    }
  }

  try {
    isLoading.value = true;

    // Use the organization store login method
    const success = await organizationStore.login(email.value, password.value);
    
    if (success) {
      // Show success toast
      toast?.add({
        severity: 'success',
        summary: 'Успішний вхід',
        detail: 'Ви успішно увійшли в систему',
        life: 3000,
      });

      // On successful login, redirect to organization profile
      router.push('/organizations/profile');
    } else {
      throw new Error('Невірні облікові дані');
    }
  } catch (error: any) {
    // Handle login errors
    const errorMessage = error instanceof Error ? error.message : 'Помилка входу. Спробуйте ще раз.';
    apiError.value = error.message;

    // Show error toast
    toast?.add({
      severity: 'error',
      summary: 'Помилка входу',
      detail: errorMessage,
      life: 5000,
    });
  } finally {
    isLoading.value = false;
  }
};

// SEO
useHead({
  title: 'Вхід для організацій',
  meta: [
    { name: 'description', content: 'Увійдіть у свій акаунт організації для управління волонтерськими проектами' },
  ],
});
</script>

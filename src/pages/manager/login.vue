<template>
  <div class="w-full h-full flex flex-col items-center justify-start bg-slate-50 p-4">
    <Card class="shadow-lg max-w-md w-full">
      <template #title>
        <div class="mb-4 items-center justify-center inline-flex gap-2">
          <i class="pi pi-shield"></i>
          <h1 class="text-center text-2xl font-bold">Вхід для адміністраторів</h1>
        </div>
      </template>
      <template #content>
        <!-- TODO: REMOVE THIS WHEN WE HAVE REAL LOGIN -->
        <TestCredentialsMessage login="admin@example.com" password="admin123" />
        <Message v-if="apiError" severity="error" icon="pi pi-exclamation-triangle" class="mb-4">{{ apiError }}</Message>
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
          </div>

          <Button type="submit" label="Увійти" class="mt-2 w-full" :loading="isLoading" :disabled="isLoading" />
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';
import Message from 'primevue/message';
const toast = useToast();
const apiError = ref('');
const managerAuth = useManagerAuthStore();

definePageMeta({
  layout: "default",
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
  apiError.value = '';

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
    const ok = await managerAuth.login(email.value, password.value);
    if (!ok) throw new Error(managerAuth.error || 'Помилка входу');
    router.push('/manager');
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
  title: 'Вхід для адміністраторів',
  meta: [
    { name: 'description', content: 'Увійдіть у свій акаунт адміністратора для управління платформою' },
  ],
});
</script>

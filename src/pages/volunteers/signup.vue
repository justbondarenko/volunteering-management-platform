<template>
  <div class="flex h-full w-full flex-col items-center justify-start bg-slate-50 p-4">
    <Card class="w-full max-w-md shadow-lg">
      <template #title>
        <div class="mb-4 inline-flex items-center justify-center gap-2">
          <i class="pi pi-user"></i>
          <h1 class="text-center text-2xl font-bold">Реєстрація волонтера</h1>
        </div>
      </template>
      <template #content>
        <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
          <!-- Email -->
          <div class="flex flex-col gap-2">
            <label for="email" class="font-medium">Email</label>
            <InputText
              id="email"
              v-model="form.email"
              type="email"
              placeholder="your@email.com"
              :class="{ 'p-invalid': errors.email !== '' }"
              aria-describedby="email-error"
              fluid
            />
            <small id="email-error" class="text-red-500" v-if="errors.email">
              {{ errors.email }}
            </small>
          </div>

          <!-- Password -->
          <div class="flex flex-col gap-2">
            <label for="password" class="font-medium">Пароль</label>
            <Password
              id="password"
              fluid
              v-model="form.password"
              toggleMask
              class="w-full"
              :class="{ 'p-invalid': errors.password !== '' }"
              aria-describedby="password-error"
              placeholder="Введіть пароль"
            />
            <small id="password-error" class="text-red-500" v-if="errors.password">
              {{ errors.password }}
            </small>
          </div>

          <!-- Confirm Password -->
          <div class="flex flex-col gap-2">
            <label for="confirmPassword" class="font-medium">Підтвердження паролю</label>
            <Password
              id="confirmPassword"
              fluid
              v-model="form.confirmPassword"
              toggleMask
              class="w-full"
              :class="{ 'p-invalid': errors.confirmPassword !== '' }"
              aria-describedby="confirmPassword-error"
              placeholder="Повторіть пароль"
            />
            <small id="confirmPassword-error" class="text-red-500" v-if="errors.confirmPassword">
              {{ errors.confirmPassword }}
            </small>
          </div>

          <!-- Terms and Conditions -->
          <div class="mt-2 flex items-start gap-2">
            <Checkbox v-model="form.acceptTerms" inputId="acceptTerms" :binary="true" />
            <label for="acceptTerms" class="text-sm">
              Я погоджуюсь з
              <a href="#" class="text-blue-600 hover:underline">умовами використання</a>
              та
              <a href="#" class="text-blue-600 hover:underline">політикою конфіденційності</a>
            </label>
          </div>
          <small id="terms-error" class="text-red-500" v-if="errors.acceptTerms">
            {{ errors.acceptTerms }}
          </small>

          <Button
            type="submit"
            label="Зареєструватися"
            class="mt-4 w-full"
            :loading="isLoading"
            :disabled="isLoading"
          />
        </form>
      </template>
      <template #footer>
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Вже зареєстровані?
            <NuxtLink to="/volunteers/login" class="text-blue-600 hover:underline">Увійти в акаунт</NuxtLink>
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
const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
});

const isLoading = ref(false);
const router = useRouter();

// Form validation schema using Zod
const registerSchema = z
  .object({
    email: z.string().email('Введіть дійсну email адресу').min(1, "Email обов'язковий"),
    password: z.string().min(8, 'Пароль має містити щонайменше 8 символів'),
    confirmPassword: z.string(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'Ви маєте погодитись з умовами використання' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmPassword'],
  });

// Form errors
const errors = ref({
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: '',
});

// Registration handler
const handleRegister = async () => {
  // Reset errors
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = '';
  });

  // Validate form
  try {
    registerSchema.parse(form.value);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const zodErrors = err.format();

      // Handle fields
      ['email', 'password', 'confirmPassword', 'acceptTerms'].forEach((field) => {
        if (zodErrors[field]?._errors?.length) {
          errors.value[field] = zodErrors[field]._errors[0];
        }
      });

      return;
    }
  }

  try {
    isLoading.value = true;

    // TODO: Implement actual registration API call here
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

    // Example registration logic (replace with actual API integration)
    // const response = await $fetch('/api/volunteers/register', {
    //   method: 'POST',
    //   body: {
    //     email: form.value.email,
    //     password: form.value.password,
    //   }
    // });

    // Show success message
    toast?.add({
      severity: 'success',
      summary: 'Реєстрація успішна',
      detail: 'Ваш акаунт створено. Тепер ви можете увійти.',
      life: 5000,
    });

    // Redirect to login page after successful registration
    router.push('/volunteers/login');
  } catch (error) {
    // Handle registration errors
    const errorMessage = error instanceof Error ? error.message : 'Помилка при реєстрації. Спробуйте ще раз.';

    // Show error toast
    toast?.add({
      severity: 'error',
      summary: 'Помилка реєстрації',
      detail: errorMessage,
      life: 5000,
    });
  } finally {
    isLoading.value = false;
  }
};

// SEO
useHead({
  title: 'Реєстрація волонтера',
  meta: [{ name: 'description', content: 'Зареєструйтеся як волонтер для участі у волонтерських проектах' }],
});
</script>

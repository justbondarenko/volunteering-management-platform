<template>
  <div class="flex h-full w-full flex-col items-center justify-start bg-slate-50 p-4">
    <Card class="w-full max-w-md shadow-lg">
      <template #title>
        <div class="mb-4 inline-flex items-center justify-center gap-2">
          <i class="pi pi-user"></i>
          <h1 class="text-center text-2xl font-bold">Створення нового паролю</h1>
        </div>
      </template>
      <template #content>
        <div v-if="!resetComplete" class="flex flex-col gap-4">
          <p class="text-gray-600">
            Створіть новий пароль для вашого облікового запису волонтера.
          </p>
          <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label for="password" class="font-medium">Новий пароль</label>
              <Password
                id="password"
                v-model="form.password"
                toggleMask
                :feedback="true"
                fluid
                class="w-full"
                :class="{ 'p-invalid': errors.password !== '' }"
                aria-describedby="password-error"
                placeholder="Введіть новий пароль"
              />
              <small id="password-error" class="text-red-500" v-if="errors.password">
                {{ errors.password }}
              </small>
            </div>

            <div class="flex flex-col gap-2">
              <label for="confirmPassword" class="font-medium">Підтвердження паролю</label>
              <Password
                id="confirmPassword"
                v-model="form.confirmPassword"
                toggleMask
                :feedback="false"
                fluid
                class="w-full"
                :class="{ 'p-invalid': errors.confirmPassword !== '' }"
                aria-describedby="confirmPassword-error"
                placeholder="Повторіть пароль"
              />
              <small id="confirmPassword-error" class="text-red-500" v-if="errors.confirmPassword">
                {{ errors.confirmPassword }}
              </small>
            </div>

            <Button
              type="submit"
              label="Змінити пароль"
              class="mt-4 w-full"
              :loading="isLoading"
              :disabled="isLoading"
            />
          </form>
        </div>
        <div v-else class="flex flex-col gap-4 items-center">
          <div class="flex items-center justify-center mb-4 text-green-600">
            <i class="pi pi-check-circle text-5xl"></i>
          </div>
          <h2 class="text-xl font-semibold text-center">Пароль змінено успішно</h2>
          <p class="text-gray-600 text-center">
            Ваш пароль було успішно змінено. Тепер ви можете увійти до свого облікового запису, використовуючи новий пароль.
          </p>
          <Button
            label="Увійти"
            class="mt-4"
            @click="navigateToLogin"
          />
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
  password: '',
  confirmPassword: '',
});

const errors = ref({
  password: '',
  confirmPassword: '',
});

const isLoading = ref(false);
const resetComplete = ref(false);
const router = useRouter();
const route = useRoute();

// Get token from query params
const token = computed(() => route.query.token as string);

// Form validation schema using Zod
const schema = z.object({
  password: z.string().min(8, 'Пароль має містити щонайменше 8 символів'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Паролі не співпадають',
  path: ['confirmPassword'],
});

// Submit handler
const handleSubmit = async () => {
  // Reset errors
  errors.value.password = '';
  errors.value.confirmPassword = '';

  // Validate form
  try {
    schema.parse(form.value);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const zodErrors = err.format();
      
      if (zodErrors.password?._errors?.length) {
        errors.value.password = zodErrors.password._errors[0];
      }
      
      if (zodErrors.confirmPassword?._errors?.length) {
        errors.value.confirmPassword = zodErrors.confirmPassword._errors[0];
      }
      
      return;
    }
  }

  try {
    isLoading.value = true;

    // Check if token exists
    if (!token.value) {
      throw new Error('Недійсний або відсутній токен скидання паролю');
    }

    // TODO: Implement actual reset password API call here
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

    // Example reset password logic (replace with actual API integration)
    // const response = await $fetch('/api/volunteers/reset-password', {
    //   method: 'POST',
    //   body: {
    //     token: token.value,
    //     password: form.value.password
    //   }
    // });

    // Show success state
    resetComplete.value = true;
  } catch (error) {
    // Handle errors
    toast?.add({
      severity: 'error',
      summary: 'Помилка',
      detail: error instanceof Error ? error.message : 'Не вдалося змінити пароль. Спробуйте ще раз.',
      life: 5000,
    });
  } finally {
    isLoading.value = false;
  }
};

// Navigate to login page
const navigateToLogin = () => {
  router.push('/volunteers/login');
};

// Check for token on page load
onMounted(() => {
  if (!token.value) {
    toast?.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Недійсний або відсутній токен скидання паролю',
      life: 5000,
    });
  }
});

// SEO
useHead({
  title: 'Створення нового паролю',
  meta: [{ name: 'description', content: 'Створення нового паролю для облікового запису волонтера' }],
});
</script>

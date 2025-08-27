<template>
  <div class="w-full h-full flex flex-col items-center justify-start bg-slate-50 p-4">
    <Card class="shadow-lg max-w-3xl w-full">
      <template #title>
        <div class="mb-4 items-center justify-center inline-flex gap-2">
          <i class="pi pi-building"></i>
          <h1 class="text-center text-2xl font-bold">Реєстрація організації</h1>
        </div>
      </template>
      <template #content>
        <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
          <!-- Organization Name -->
          <div class="flex flex-col gap-2">
            <label for="name" class="font-medium">Назва організації</label>
            <InputText
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Назва вашої організації"
              :class="{ 'p-invalid': errors.name !== '' }"
              aria-describedby="name-error"
            />
            <small id="name-error" class="text-red-500" v-if="errors.name">
              {{ errors.name }}
            </small>
          </div>

          <!-- Legal Entity Name -->
          <div class="flex flex-col gap-2">
            <label for="legalName" class="font-medium">Юридична назва</label>
            <InputText
              id="legalName"
              v-model="form.legalName"
              type="text"
              placeholder="Повна юридична назва організації"
              :class="{ 'p-invalid': errors.legalName !== '' }"
              aria-describedby="legalName-error"
            />
            <small id="legalName-error" class="text-red-500" v-if="errors.legalName">
              {{ errors.legalName }}
            </small>
          </div>

          <!-- Address Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Country -->
            <div class="flex flex-col gap-2">
              <label for="country" class="font-medium">Країна</label>
              <Dropdown
                id="country"
                v-model="form.address.country"
                :options="countries"
                optionLabel="name"
                optionValue="code"
                placeholder="Виберіть країну"
                class="w-full"
                :class="{ 'p-invalid': errors['address.country'] !== '' }"
                aria-describedby="country-error"
              />
              <small id="country-error" class="text-red-500" v-if="errors['address.country']">
                {{ errors['address.country'] }}
              </small>
            </div>

            <!-- City -->
            <div class="flex flex-col gap-2">
              <label for="city" class="font-medium">Місто</label>
              <InputText
                id="city"
                v-model="form.address.city"
                type="text"
                placeholder="Місто"
                :class="{ 'p-invalid': errors['address.city'] !== '' }"
                aria-describedby="city-error"
              />
              <small id="city-error" class="text-red-500" v-if="errors['address.city']">
                {{ errors['address.city'] }}
              </small>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Address -->
            <div class="flex flex-col gap-2 md:col-span-2">
              <label for="addressLine" class="font-medium">Адреса</label>
              <InputText
                id="addressLine"
                v-model="form.address.addressLine"
                type="text"
                placeholder="Вулиця, номер будинку"
                :class="{ 'p-invalid': errors['address.addressLine'] !== '' }"
                aria-describedby="addressLine-error"
              />
              <small id="addressLine-error" class="text-red-500" v-if="errors['address.addressLine']">
                {{ errors['address.addressLine'] }}
              </small>
            </div>

            <!-- Zip Code -->
            <div class="flex flex-col gap-2">
              <label for="zip" class="font-medium">Поштовий індекс</label>
              <InputText
                id="zip"
                v-model="form.address.zip"
                type="text"
                placeholder="Індекс"
                :class="{ 'p-invalid': errors['address.zip'] !== '' }"
                aria-describedby="zip-error"
              />
              <small id="zip-error" class="text-red-500" v-if="errors['address.zip']">
                {{ errors['address.zip'] }}
              </small>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Phone Number -->
            <div class="flex flex-col gap-2">
              <label for="phone" class="font-medium">Номер телефону</label>
              <InputText
                id="phone"
                v-model="form.phone"
                type="tel"
                placeholder="+380XXXXXXXXX"
                :class="{ 'p-invalid': errors.phone !== '' }"
                aria-describedby="phone-error"
              />
              <small id="phone-error" class="text-red-500" v-if="errors.phone">
                {{ errors.phone }}
              </small>
            </div>

            <!-- EDRPOU -->
            <div class="flex flex-col gap-2">
              <label for="edrpou" class="font-medium">ЄДРПОУ</label>
              <InputText
                id="edrpou"
                v-model="form.edrpou"
                type="text"
                placeholder="8-значний код ЄДРПОУ"
                :class="{ 'p-invalid': errors.edrpou !== '' }"
                aria-describedby="edrpou-error"
              />
              <small id="edrpou-error" class="text-red-500" v-if="errors.edrpou">
                {{ errors.edrpou }}
              </small>
            </div>
          </div>

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
            />
            <small id="email-error" class="text-red-500" v-if="errors.email">
              {{ errors.email }}
            </small>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Password -->
            <div class="flex flex-col gap-2">
              <label for="password" class="font-medium">Пароль</label>
              <Password
                id="password"
                v-model="form.password"
                toggleMask
                :feedback="true"
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
                v-model="form.confirmPassword"
                toggleMask
                :feedback="false"
                class="w-full"
                :class="{ 'p-invalid': errors.confirmPassword !== '' }"
                aria-describedby="confirmPassword-error"
                placeholder="Повторіть пароль"
              />
              <small id="confirmPassword-error" class="text-red-500" v-if="errors.confirmPassword">
                {{ errors.confirmPassword }}
              </small>
            </div>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-start gap-2 mt-2">
            <Checkbox v-model="form.acceptTerms" inputId="acceptTerms" :binary="true" />
            <label for="acceptTerms" class="text-sm">
              Я погоджуюсь з 
              <a href="#" class="text-blue-600 hover:underline">умовами використання</a> 
              та <a href="#" class="text-blue-600 hover:underline">політикою конфіденційності</a>
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
            <NuxtLink to="/organizations/login" class="text-blue-600 hover:underline">Увійти в акаунт</NuxtLink>
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
  name: '',
  legalName: '',
  address: {
    country: 'UA',
    city: '',
    addressLine: '',
    zip: '',
  },
  phone: '',
  edrpou: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
});

const isLoading = ref(false);
const router = useRouter();

// Country options
const countries = [
  { name: 'Україна', code: 'UA' },
  { name: 'Польща', code: 'PL' },
  { name: 'Німеччина', code: 'DE' },
  { name: 'США', code: 'US' },
  { name: 'Великобританія', code: 'GB' },
];

// Form validation schema using Zod
const registerSchema = z.object({
  name: z.string().min(2, 'Назва організації має містити щонайменше 2 символи'),
  legalName: z.string().min(2, 'Юридична назва має містити щонайменше 2 символи'),
  address: z.object({
    country: z.string().min(1, 'Виберіть країну'),
    city: z.string().min(2, 'Вкажіть місто'),
    addressLine: z.string().min(5, 'Вкажіть повну адресу'),
    zip: z.string().min(4, 'Вкажіть поштовий індекс'),
  }),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, 'Введіть коректний номер телефону'),
  edrpou: z.string().regex(/^[0-9]{8}$/, 'ЄДРПОУ має містити 8 цифр'),
  email: z.string().email('Введіть дійсну email адресу'),
  password: z.string().min(8, 'Пароль має містити щонайменше 8 символів'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((value) => value, {
    message: 'Ви маєте погодитись з умовами використання',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Паролі не співпадають',
  path: ['confirmPassword'],
});

// Form errors
const errors = ref({
  name: '',
  legalName: '',
  'address.country': '',
  'address.city': '',
  'address.addressLine': '',
  'address.zip': '',
  phone: '',
  edrpou: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: '',
});

// Registration handler
const handleRegister = async () => {
  // Reset errors
  Object.keys(errors.value).forEach(key => {
    errors.value[key as keyof typeof errors.value] = '';
  });

  // Validate form
  try {
    registerSchema.parse(form.value);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const zodErrors = err.format();
      
      // Handle flat fields
      ['name', 'legalName', 'phone', 'edrpou', 'email', 'password', 'confirmPassword', 'acceptTerms'].forEach(field => {
        if (zodErrors[field]?._errors?.length) {
          errors.value[field as keyof typeof errors.value] = zodErrors[field]._errors[0];
        }
      });
      
      // Handle nested address fields
      if (zodErrors.address) {
        ['country', 'city', 'addressLine', 'zip'].forEach(field => {
          if (zodErrors.address[field]?._errors?.length) {
            errors.value[`address.${field}` as keyof typeof errors.value] = zodErrors.address[field]._errors[0];
          }
        });
      }
      
      return;
    }
  }

  try {
    isLoading.value = true;

    // TODO: Implement actual registration API call here
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

    // Example registration logic (replace with actual API integration)
    // const response = await $fetch('/api/organizations/register', {
    //   method: 'POST',
    //   body: {
    //     name: form.value.name,
    //     legalName: form.value.legalName,
    //     address: form.value.address,
    //     phone: form.value.phone,
    //     edrpou: form.value.edrpou,
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
    router.push('/organizations/login');
  } catch (error) {
    // Handle registration errors
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Помилка при реєстрації. Спробуйте ще раз.';

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
  title: 'Реєстрація організації',
  meta: [
    { name: 'description', content: 'Зареєструйте вашу організацію для управління волонтерськими проектами' },
  ],
});
</script>

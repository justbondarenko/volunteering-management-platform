<template>
  <div class="flex w-full h-full flex-col items-center p-4">
    <div class="w-full max-w-4xl">
      <!-- Loading state -->
      <div v-if="volunteerStore.isLoading && !volunteerStore.volunteer" class="flex justify-center items-center py-8">
        <ProgressSpinner />
      </div>

      <!-- Error state -->
      <div v-else-if="volunteerStore.error && !volunteerStore.volunteer" class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-600">{{ volunteerStore.error }}</p>
        <Button label="Спробувати знову" severity="secondary" class="mt-3" @click="volunteerStore.fetchVolunteer" />
      </div>


      <!-- Settings content -->
      <div v-else-if="volunteerStore.volunteer" class="flex flex-col gap-6">
        <!-- Page Header -->
        <Card>
          <template #content>
            <div class="flex items-center gap-3">
              <i class="pi pi-cog text-2xl text-primary"></i>
              <div>
                <h1 class="text-2xl font-bold">Налаштування</h1>
                <p class="text-gray-600">Керуйте своїми налаштуваннями профілю та сповіщень</p>
              </div>
            </div>
          </template>
        </Card>

        <!-- Email Notifications -->
        <Card>
          <template #title>
            <div class="flex items-center gap-2">
              <i class="pi pi-envelope"></i>
              <h2 class="text-xl font-semibold">Сповіщення по електронній пошті</h2>
            </div>
          </template>
          <template #content>
            <form @submit.prevent="saveSettings" class="flex flex-col gap-6">
              <div class="space-y-4">
                <!-- Event Notifications -->
                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div class="flex flex-col">
                    <h3 class="font-medium text-gray-900">Сповіщення про події</h3>
                    <p class="text-sm text-gray-600">Отримувати сповіщення про нові події та зміни в подіях</p>
                  </div>
                  <InputSwitch v-model="settings.emailNotifications.events" />
                </div>

                <!-- Event Reminders -->
                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div class="flex flex-col">
                    <h3 class="font-medium text-gray-900">Нагадування про події</h3>
                    <p class="text-sm text-gray-600">Отримувати нагадування за день до початку події</p>
                  </div>
                  <InputSwitch v-model="settings.emailNotifications.eventReminders" />
                </div>

                <!-- Organization Updates -->
                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div class="flex flex-col">
                    <h3 class="font-medium text-gray-900">Оновлення організацій</h3>
                    <p class="text-sm text-gray-600">Отримувати сповіщення про оновлення від організацій</p>
                  </div>
                  <InputSwitch v-model="settings.emailNotifications.organizationUpdates" />
                </div>

                <!-- Weekly Summary -->
                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div class="flex flex-col">
                    <h3 class="font-medium text-gray-900">Тижневий звіт</h3>
                    <p class="text-sm text-gray-600">Отримувати щотижневий звіт про активність</p>
                  </div>
                  <InputSwitch v-model="settings.emailNotifications.weeklySummary" />
                </div>

                <!-- Marketing Emails -->
                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div class="flex flex-col">
                    <h3 class="font-medium text-gray-900">Маркетингові листи</h3>
                    <p class="text-sm text-gray-600">Отримувати інформацію про нові можливості та функції</p>
                  </div>
                  <InputSwitch v-model="settings.emailNotifications.marketing" />
                </div>
              </div>

              <!-- Notification Frequency -->
              <div class="flex flex-col gap-2">
                <label class="font-medium">Частота сповіщень</label>
                <Select
                  v-model="settings.emailNotifications.frequency"
                  :options="frequencyOptions"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Виберіть частоту"
                  class="w-full md:w-64"
                />
              </div>

              <!-- Submit button -->
              <div class="flex justify-end mt-4">
                <Button
                  type="submit"
                  label="Зберегти налаштування"
                  icon="pi pi-check"
                  :loading="isSaving"
                  :disabled="isSaving"
                />
              </div>
            </form>
          </template>
        </Card>

        <!-- Privacy Settings -->
        <Card>
          <template #title>
            <div class="flex items-center gap-2">
              <i class="pi pi-shield"></i>
              <h2 class="text-xl font-semibold">Приватність</h2>
            </div>
          </template>
          <template #content>
            <div class="space-y-4">
              <!-- Profile Visibility -->
              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div class="flex flex-col">
                  <h3 class="font-medium text-gray-900">Публічний профіль</h3>
                  <p class="text-sm text-gray-600">Дозволити іншим користувачам переглядати ваш профіль</p>
                </div>
                <InputSwitch v-model="settings.privacy.publicProfile" />
              </div>

              <!-- Show Contact Info -->
              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div class="flex flex-col">
                  <h3 class="font-medium text-gray-900">Показувати контактну інформацію</h3>
                  <p class="text-sm text-gray-600">Дозволити організаціям бачити вашу контактну інформацію</p>
                </div>
                <InputSwitch v-model="settings.privacy.showContactInfo" />
              </div>

              <!-- Show Skills -->
              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div class="flex flex-col">
                  <h3 class="font-medium text-gray-900">Показувати навички</h3>
                  <p class="text-sm text-gray-600">Дозволити іншим бачити ваші навички та рейтинг</p>
                </div>
                <InputSwitch v-model="settings.privacy.showSkills" />
              </div>
            </div>
          </template>
        </Card>

        <!-- Account Settings -->
        <Card>
          <template #title>
            <div class="flex items-center gap-2">
              <i class="pi pi-user-edit"></i>
              <h2 class="text-xl font-semibold">Обліковий запис</h2>
            </div>
          </template>
          <template #content>
            <div class="space-y-4">
              <!-- Change Password -->
              <div class="p-4 border border-gray-200 rounded-lg">
                <h3 class="font-medium text-gray-900 mb-3">Змінити пароль</h3>
                <div class="flex flex-col gap-3">
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-medium">Поточний пароль</label>
                    <Password
                      v-model="passwordForm.currentPassword"
                      placeholder="Введіть поточний пароль"
                      :feedback="false"
                      toggleMask
                      class="w-full md:w-80"
                    />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-medium">Новий пароль</label>
                    <Password
                      v-model="passwordForm.newPassword"
                      placeholder="Введіть новий пароль"
                      :feedback="true"
                      toggleMask
                      class="w-full md:w-80"
                    />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-medium">Підтвердіть новий пароль</label>
                    <Password
                      v-model="passwordForm.confirmPassword"
                      placeholder="Підтвердіть новий пароль"
                      :feedback="false"
                      toggleMask
                      class="w-full md:w-80"
                    />
                  </div>
                  <Button
                    label="Змінити пароль"
                    severity="secondary"
                    size="small"
                    @click="changePassword"
                    :loading="isChangingPassword"
                    :disabled="isChangingPassword"
                  />
                </div>
              </div>

              <!-- Delete Account -->
              <div class="p-4 border border-red-200 rounded-lg bg-red-50">
                <h3 class="font-medium text-red-900 mb-2">Видалити обліковий запис</h3>
                <p class="text-sm text-red-700 mb-3">
                  Ця дія незворотна. Всі ваші дані будуть видалені назавжди.
                </p>
                <Button
                  label="Видалити обліковий запис"
                  severity="danger"
                  size="small"
                  @click="confirmDeleteAccount"
                />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVolunteerStore } from '~/stores/volunteer';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

// Define page metadata
definePageMeta({
  layout: 'volunteer',
  middleware: 'volunteer-auth'
});

// Initialize store
const volunteerStore = useVolunteerStore();

// Settings state
const settings = ref({
  emailNotifications: {
    events: true,
    eventReminders: true,
    organizationUpdates: true,
    weeklySummary: false,
    marketing: false,
    frequency: 'immediate'
  },
  privacy: {
    publicProfile: true,
    showContactInfo: true,
    showSkills: true
  }
});

// Password change form
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Loading states
const isSaving = ref(false);
const isChangingPassword = ref(false);

// Frequency options for notifications
const frequencyOptions = [
  { label: 'Миттєво', value: 'immediate' },
  { label: 'Щодня', value: 'daily' },
  { label: 'Щотижня', value: 'weekly' },
  { label: 'Ніколи', value: 'never' }
];

// Load settings on mount
onMounted(async () => {
  await volunteerStore.fetchVolunteer();
  
  // Load settings from localStorage or use defaults
  const savedSettings = localStorage.getItem('volunteer-settings');
  if (savedSettings) {
    try {
      settings.value = { ...settings.value, ...JSON.parse(savedSettings) };
    } catch (e) {
      console.error('Failed to parse saved settings:', e);
    }
  }
});

// Save settings
const saveSettings = async () => {
  isSaving.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Save to localStorage
    localStorage.setItem('volunteer-settings', JSON.stringify(settings.value));
    
    toast?.add({
      severity: 'success',
      summary: 'Налаштування збережено',
      detail: 'Ваші налаштування успішно оновлено',
      life: 3000,
    });
  } catch (error) {
    toast?.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Не вдалося зберегти налаштування. Спробуйте ще раз.',
      life: 5000,
    });
  } finally {
    isSaving.value = false;
  }
};

// Change password
const changePassword = async () => {
  if (!passwordForm.value.currentPassword || !passwordForm.value.newPassword) {
    toast?.add({
      severity: 'warn',
      summary: 'Помилка валідації',
      detail: 'Будь ласка, заповніть всі поля',
      life: 3000,
    });
    return;
  }

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    toast?.add({
      severity: 'warn',
      summary: 'Помилка валідації',
      detail: 'Нові паролі не співпадають',
      life: 3000,
    });
    return;
  }

  if (passwordForm.value.newPassword.length < 6) {
    toast?.add({
      severity: 'warn',
      summary: 'Помилка валідації',
      detail: 'Пароль має містити щонайменше 6 символів',
      life: 3000,
    });
    return;
  }

  isChangingPassword.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Reset form
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    
    toast?.add({
      severity: 'success',
      summary: 'Пароль змінено',
      detail: 'Ваш пароль успішно оновлено',
      life: 3000,
    });
  } catch (error) {
    toast?.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Не вдалося змінити пароль. Спробуйте ще раз.',
      life: 5000,
    });
  } finally {
    isChangingPassword.value = false;
  }
};

// Confirm delete account
const confirmDeleteAccount = () => {
  // In a real app, this would show a confirmation dialog
  toast?.add({
    severity: 'warn',
    summary: 'Функція в розробці',
    detail: 'Видалення облікового запису буде доступне в наступній версії',
    life: 5000,
  });
};

// SEO
useHead({
  title: 'Налаштування волонтера',
  meta: [{ name: 'description', content: 'Керуйте налаштуваннями свого профілю волонтера' }],
});
</script>

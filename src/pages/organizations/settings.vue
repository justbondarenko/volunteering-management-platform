<template>
  <div class="flex w-full h-full flex-col items-center p-4">
    <div class="w-full max-w-4xl">
      <!-- Loading state -->
      <div v-if="organizationStore.isLoading && !organizationStore.organization" class="flex justify-center items-center py-8">
        <ProgressSpinner />
      </div>

      <!-- Error state -->
      <div v-else-if="organizationStore.error && !organizationStore.organization" class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-600">{{ organizationStore.error }}</p>
        <Button label="Спробувати знову" severity="secondary" class="mt-3" @click="organizationStore.fetchOrganization" />
      </div>

      <!-- Settings content -->
      <div v-else-if="organizationStore.organization" class="flex flex-col gap-6">
        <!-- Page Header -->
        <Card>
          <template #content>
            <div class="flex items-center gap-3">
              <i class="pi pi-cog text-2xl text-primary"></i>
              <div>
                <h1 class="text-2xl font-bold">Налаштування</h1>
                <p class="text-gray-600">Керуйте налаштуваннями профілю та сповіщень вашої організації</p>
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
                <!-- Project Updates -->
                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div class="flex flex-col">
                    <h3 class="font-medium text-gray-900">Оновлення проектів</h3>
                    <p class="text-sm text-gray-600">Отримувати сповіщення коли волонтери приєднуються до проектів або залишають їх</p>
                  </div>
                  <InputSwitch v-model="settings.emailNotifications.projectUpdates" />
                </div>

                <!-- Volunteer Applications -->
                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div class="flex flex-col">
                    <h3 class="font-medium text-gray-900">Заявки волонтерів</h3>
                    <p class="text-sm text-gray-600">Отримувати сповіщення про нові заявки волонтерів</p>
                  </div>
                  <InputSwitch v-model="settings.emailNotifications.volunteerApplications" />
                </div>

                <!-- Event Reminders -->
                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div class="flex flex-col">
                    <h3 class="font-medium text-gray-900">Нагадування про події</h3>
                    <p class="text-sm text-gray-600">Отримувати нагадування перед початком організованих подій</p>
                  </div>
                  <InputSwitch v-model="settings.emailNotifications.eventReminders" />
                </div>

                <!-- Weekly Summary -->
                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div class="flex flex-col">
                    <h3 class="font-medium text-gray-900">Тижневий звіт</h3>
                    <p class="text-sm text-gray-600">Отримувати щотижневий звіт про активність волонтерів та проекти</p>
                  </div>
                  <InputSwitch v-model="settings.emailNotifications.weeklySummary" />
                </div>

                <!-- System Updates -->
                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div class="flex flex-col">
                    <h3 class="font-medium text-gray-900">Оновлення платформи</h3>
                    <p class="text-sm text-gray-600">Отримувати інформацію про оновлення платформи та нові функції</p>
                  </div>
                  <InputSwitch v-model="settings.emailNotifications.systemUpdates" />
                </div>
              </div>

              <!-- Notification Frequency -->
              <div class="flex flex-col gap-2">
                <label for="frequency" class="font-medium">Частота сповіщень</label>
                <Select
                  id="frequency"
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
              <!-- Public Profile -->
              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div class="flex flex-col">
                  <h3 class="font-medium text-gray-900">Публічний профіль</h3>
                  <p class="text-sm text-gray-600">Дозволити публічний перегляд профілю організації</p>
                </div>
                <InputSwitch v-model="settings.privacy.publicProfile" />
              </div>

              <!-- Auto-approve Volunteers -->
              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div class="flex flex-col">
                  <h3 class="font-medium text-gray-900">Автоматичне схвалення волонтерів</h3>
                  <p class="text-sm text-gray-600">Автоматично схвалювати заявки волонтерів без ручного розгляду</p>
                </div>
                <InputSwitch v-model="settings.privacy.autoApproveVolunteers" />
              </div>

              <!-- Show Projects Publicly -->
              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div class="flex flex-col">
                  <h3 class="font-medium text-gray-900">Показувати проекти публічно</h3>
                  <p class="text-sm text-gray-600">Відображати проекти на публічних сторінках платформи</p>
                </div>
                <InputSwitch v-model="settings.privacy.showProjectsPublicly" />
              </div>

              <!-- Show Contact Info -->
              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div class="flex flex-col">
                  <h3 class="font-medium text-gray-900">Показувати контактну інформацію</h3>
                  <p class="text-sm text-gray-600">Дозволити волонтерам бачити контактну інформацію організації</p>
                </div>
                <InputSwitch v-model="settings.privacy.showContactInfo" />
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
                    <label for="currentPassword" class="text-sm font-medium">Поточний пароль</label>
                    <Password
                      id="currentPassword"
                      v-model="passwordForm.currentPassword"
                      placeholder="Введіть поточний пароль"
                      :feedback="false"
                      toggleMask
                      class="w-full md:w-80"
                    />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label for="newPassword" class="text-sm font-medium">Новий пароль</label>
                    <Password
                      id="newPassword"
                      v-model="passwordForm.newPassword"
                      placeholder="Введіть новий пароль"
                      :feedback="true"
                      toggleMask
                      class="w-full md:w-80"
                    />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label for="confirmPassword" class="text-sm font-medium">Підтвердіть новий пароль</label>
                    <Password
                      id="confirmPassword"
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
                  Ця дія незворотна. Всі дані організації будуть видалені назавжди.
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
import { useOrganizationStore } from '~/stores/organization';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

// Define page metadata
definePageMeta({
  layout: 'organization',
});

// Initialize store
const organizationStore = useOrganizationStore();

// Settings state
const settings = ref({
  emailNotifications: {
    projectUpdates: true,
    volunteerApplications: true,
    eventReminders: true,
    weeklySummary: false,
    systemUpdates: true,
    frequency: 'immediate'
  },
  privacy: {
    publicProfile: true,
    autoApproveVolunteers: false,
    showProjectsPublicly: true,
    showContactInfo: true
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
  await organizationStore.fetchOrganization();
  
  // Load settings from localStorage or use defaults
  const savedSettings = localStorage.getItem('organization-settings');
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
    localStorage.setItem('organization-settings', JSON.stringify(settings.value));
    
    toast?.add({
      severity: 'success',
      summary: 'Налаштування збережено',
      detail: 'Налаштування вашої організації успішно оновлено',
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
      detail: 'Пароль вашої організації успішно оновлено',
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
  title: 'Налаштування організації',
  meta: [{ name: 'description', content: 'Керуйте налаштуваннями профілю вашої організації' }],
});
</script>

<template>
  <div class="flex w-full h-full flex-col items-center p-4">
    <div class="w-full max-w-4xl">
      <!-- Page Header -->
      <Card>
        <template #content>
          <div class="flex items-center gap-3">
            <i class="pi pi-cog text-2xl text-primary"></i>
            <div>
              <h1 class="text-2xl font-bold">Налаштування адміністратора</h1>
              <p class="text-gray-600">Керуйте налаштуваннями облікового запису адміністратора та сповіщеннями</p>
            </div>
          </div>
        </template>
      </Card>

      <!-- Email Notifications -->
      <Card class="mt-6">
        <template #title>
          <div class="flex items-center gap-2">
            <i class="pi pi-envelope"></i>
            <h2 class="text-xl font-semibold">Сповіщення по електронній пошті</h2>
          </div>
        </template>
        <template #content>
          <form @submit.prevent="saveSettings" class="flex flex-col gap-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div class="flex flex-col">
                  <h3 class="font-medium text-gray-900">Оновлення системи</h3>
                  <p class="text-sm text-gray-600">Отримувати сповіщення про оновлення платформи та зміни налаштувань</p>
                </div>
                <InputSwitch v-model="settings.email.systemUpdates" />
              </div>

              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div class="flex flex-col">
                  <h3 class="font-medium text-gray-900">Щотижневий звіт</h3>
                  <p class="text-sm text-gray-600">Отримувати щотижневі дайджести активності на платформі</p>
                </div>
                <InputSwitch v-model="settings.email.weeklyDigest" />
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label for="mgr-frequency" class="font-medium">Частота сповіщень</label>
              <Select
                id="mgr-frequency"
                v-model="settings.email.frequency"
                :options="frequencyOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Виберіть частоту"
                class="w-full md:w-64"
              />
            </div>

            <div class="flex justify-end mt-4">
              <Button type="submit" label="Зберегти налаштування" icon="pi pi-check" :loading="isSaving" :disabled="isSaving" />
            </div>
          </form>
        </template>
      </Card>

      <!-- Account Settings -->
      <Card class="mt-6">
        <template #title>
          <div class="flex items-center gap-2">
            <i class="pi pi-user-edit"></i>
            <h2 class="text-xl font-semibold">Обліковий запис</h2>
          </div>
        </template>
        <template #content>
          <div class="space-y-4">
            <div class="p-4 border border-gray-200 rounded-lg">
              <h3 class="font-medium text-gray-900 mb-3">Змінити пароль</h3>
              <div class="flex flex-col gap-3">
                <div class="flex flex-col gap-2">
                  <label for="mgr-currentPassword" class="text-sm font-medium">Поточний пароль</label>
                  <Password id="mgr-currentPassword" v-model="passwordForm.current" placeholder="Введіть поточний пароль" :feedback="false" toggleMask class="w-full md:w-80" />
                </div>
                <div class="flex flex-col gap-2">
                  <label for="mgr-newPassword" class="text-sm font-medium">Новий пароль</label>
                  <Password id="mgr-newPassword" v-model="passwordForm.new" placeholder="Введіть новий пароль" :feedback="true" toggleMask class="w-full md:w-80" />
                </div>
                <div class="flex flex-col gap-2">
                  <label for="mgr-confirmPassword" class="text-sm font-medium">Підтвердіть новий пароль</label>
                  <Password id="mgr-confirmPassword" v-model="passwordForm.confirm" placeholder="Підтвердіть новий пароль" :feedback="false" toggleMask class="w-full md:w-80" />
                </div>
                <Button label="Змінити пароль" severity="secondary" size="small" @click="changePassword" :loading="isChangingPassword" :disabled="isChangingPassword" />
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'manager' });

const isSaving = ref(false);
const isChangingPassword = ref(false);

const settings = ref({
  email: {
    systemUpdates: true,
    weeklyDigest: true,
    frequency: 'immediate',
  },
});

const passwordForm = ref({
  current: '',
  new: '',
  confirm: '',
});

const frequencyOptions = [
  { label: 'Миттєво', value: 'immediate' },
  { label: 'Щодня', value: 'daily' },
  { label: 'Щотижня', value: 'weekly' },
  { label: 'Ніколи', value: 'never' },
];

onMounted(() => {
  const saved = localStorage.getItem('manager-settings');
  if (saved) {
    try { settings.value = { ...settings.value, ...JSON.parse(saved) }; } catch {}
  }
});

const saveSettings = async () => {
  isSaving.value = true;
  try {
    await new Promise(r => setTimeout(r, 800));
    localStorage.setItem('manager-settings', JSON.stringify(settings.value));
  } finally {
    isSaving.value = false;
  }
};

const changePassword = async () => {
  if (!passwordForm.value.current || !passwordForm.value.new || passwordForm.value.new !== passwordForm.value.confirm) return;
  isChangingPassword.value = true;
  try {
    await new Promise(r => setTimeout(r, 1000));
    passwordForm.value = { current: '', new: '', confirm: '' };
  } finally {
    isChangingPassword.value = false;
  }
};

useHead({
  title: 'Налаштування адміністратора',
  meta: [{ name: 'description', content: 'Керуйте налаштуваннями адміністратора платформи' }],
});
</script>

<style scoped>
</style>



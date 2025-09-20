<template>
  <div class="flex w-full h-full flex-col gap-4 p-4">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Події організації</h1>
        <p class="text-gray-600">Переглядайте створені події та додавайте нові</p>
      </div>
      <Button label="Створити подію" icon="pi pi-plus" @click="openCreate()" />
    </div>

    <Card>
      <template #title>
        <div class="flex items-center gap-2">
          <i class="pi pi-calendar" />
          <h2 class="text-xl font-semibold">Список подій</h2>
        </div>
      </template>
      <template #content>
        <DataTable :value="events" paginator :rows="10" dataKey="id" responsiveLayout="scroll">
          <Column field="title" header="Назва" sortable />
          <Column field="date" header="Дата" :body="dateBody" sortable />
          <Column field="location" header="Локація" sortable />
          <Column header="Волонтери" :body="volunteersBody" />
          <Column field="status" header="Статус" :body="statusBody" sortable />
          <Column header="Дії" :body="actionsBody" />
        </DataTable>
      </template>
    </Card>

    <Dialog v-model:visible="isCreateOpen" modal header="Нова подія" :style="{ width: '600px' }">
      <form @submit.prevent="handleCreate" class="flex flex-col gap-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label for="title" class="font-medium">Назва</label>
            <InputText id="title" v-model="createForm.title" :class="{ 'p-invalid': errors.title }" placeholder="Назва події" />
            <small v-if="errors.title" class="text-red-500">{{ errors.title }}</small>
          </div>
          <div class="flex flex-col gap-2">
            <label for="date" class="font-medium">Дата</label>
            <Calendar id="date" v-model="createForm.date" showTime hourFormat="24" showIcon :class="{ 'p-invalid': errors.date }" />
            <small v-if="errors.date" class="text-red-500">{{ errors.date }}</small>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label for="location" class="font-medium">Локація</label>
            <InputText id="location" v-model="createForm.location" :class="{ 'p-invalid': errors.location }" placeholder="Місто, адреса чи онлайн" />
            <small v-if="errors.location" class="text-red-500">{{ errors.location }}</small>
          </div>
          <div class="flex flex-col gap-2">
            <label for="volunteersNeeded" class="font-medium">Потрібно волонтерів</label>
            <InputNumber id="volunteersNeeded" v-model="createForm.volunteersNeeded" :min="1" :max="10000" :class="{ 'p-invalid': errors.volunteersNeeded }" />
            <small v-if="errors.volunteersNeeded" class="text-red-500">{{ errors.volunteersNeeded }}</small>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label for="description" class="font-medium">Опис</label>
          <Textarea id="description" v-model="createForm.description" rows="4" autoResize :class="{ 'p-invalid': errors.description }" placeholder="Коротко опишіть подію" />
          <small v-if="errors.description" class="text-red-500">{{ errors.description }}</small>
        </div>

        <div class="flex flex-col gap-2">
          <label for="status" class="font-medium">Статус</label>
          <Dropdown id="status" v-model="createForm.status" :options="statusOptions" optionLabel="label" optionValue="value" placeholder="Виберіть статус" />
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <Button type="button" label="Скасувати" severity="secondary" @click="isCreateOpen = false" />
          <Button type="submit" label="Створити" :loading="isSubmitting" />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';

definePageMeta({
  layout: 'organization',
});

interface EventItem {
  id: string;
  title: string;
  date: string; // ISO string
  location: string;
  description: string;
  status: 'draft' | 'published' | 'completed' | 'cancelled';
  volunteersNeeded: number;
  volunteersAssigned: number;
}

const statusOptions = [
  { label: 'Чернетка', value: 'draft' },
  { label: 'Опубліковано', value: 'published' },
  { label: 'Завершено', value: 'completed' },
  { label: 'Скасовано', value: 'cancelled' },
] as const;

const events = ref<EventItem[]>([
  {
    id: 'e1',
    title: 'Збір гуманітарної допомоги',
    date: new Date().toISOString(),
    location: 'Київ, площа Свободи 1',
    description: 'Збір продуктів харчування та необхідних речей для постраждалих.',
    status: 'published',
    volunteersNeeded: 20,
    volunteersAssigned: 12,
  },
  {
    id: 'e2',
    title: 'Прибирання парку',
    date: new Date(Date.now() + 86400000).toISOString(),
    location: 'Львів, парк Франка',
    description: 'Екологічна акція з прибирання території парку.',
    status: 'draft',
    volunteersNeeded: 15,
    volunteersAssigned: 3,
  },
]);

const isCreateOpen = ref(false);
const isSubmitting = ref(false);

const createForm = ref({
  title: '',
  date: null as Date | null,
  location: '',
  description: '',
  status: 'draft' as EventItem['status'],
  volunteersNeeded: 1,
});

const errors = ref({
  title: '',
  date: '',
  location: '',
  description: '',
  volunteersNeeded: '',
});

const schema = z.object({
  title: z.string().min(3, 'Вкажіть назву (мін. 3 символи)'),
  date: z.date({ required_error: 'Вкажіть дату' }),
  location: z.string().min(3, 'Вкажіть локацію'),
  description: z.string().min(10, 'Опис має містити щонайменше 10 символів'),
  volunteersNeeded: z.number().int().min(1, 'Кількість волонтерів має бути ≥ 1'),
});

const openCreate = () => {
  resetForm();
  isCreateOpen.value = true;
};

const resetForm = () => {
  createForm.value = { title: '', date: null, location: '', description: '', status: 'draft', volunteersNeeded: 1 };
  errors.value = { title: '', date: '', location: '', description: '', volunteersNeeded: '' };
};

const handleCreate = async () => {
  errors.value = { title: '', date: '', location: '', description: '', volunteersNeeded: '' };

  try {
    const parsed = schema.parse({
      title: createForm.value.title,
      date: createForm.value.date ?? undefined,
      location: createForm.value.location,
      description: createForm.value.description,
      volunteersNeeded: createForm.value.volunteersNeeded,
    });

    isSubmitting.value = true;

    // Simulate API call
    await new Promise((r) => setTimeout(r, 600));

    const newEvent: EventItem = {
      id: String(Date.now()),
      title: parsed.title,
      date: (createForm.value.date as Date).toISOString(),
      location: parsed.location,
      description: parsed.description,
      status: createForm.value.status,
      volunteersNeeded: parsed.volunteersNeeded,
      volunteersAssigned: 0,
    };

    events.value = [newEvent, ...events.value];
    isCreateOpen.value = false;
  } catch (err) {
    if (err instanceof z.ZodError) {
      const zodErrors = err.format();
      errors.value.title = zodErrors.title?._errors?.[0] ?? '';
      errors.value.date = zodErrors.date?._errors?.[0] ?? '';
      errors.value.location = zodErrors.location?._errors?.[0] ?? '';
      errors.value.description = zodErrors.description?._errors?.[0] ?? '';
      errors.value.volunteersNeeded = zodErrors.volunteersNeeded?._errors?.[0] ?? '';
    }
  } finally {
    isSubmitting.value = false;
  }
};

const dateBody = (row: EventItem) => {
  try {
    return new Intl.DateTimeFormat('uk-UA', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(row.date));
  } catch {
    return row.date;
  }
};

const volunteersBody = (row: EventItem) => `${row.volunteersAssigned} / ${row.volunteersNeeded}`;

const statusBody = (row: EventItem) => {
  const map: Record<EventItem['status'], string> = {
    draft: 'Чернетка',
    published: 'Опубліковано',
    completed: 'Завершено',
    cancelled: 'Скасовано',
  };
  return map[row.status];
};

const actionsBody = (row: EventItem) => {
  return h('div', { class: 'flex items-center gap-2' }, [
    h(Button, { label: 'Деталі', size: 'small', severity: 'secondary', onClick: () => viewDetails(row) }),
  ]);
};

const viewDetails = (row: EventItem) => {
  // Placeholder for future details view
  // Could navigate to `/organizations/events/{id}` when implemented
};

useHead({
  title: 'Події організації',
  meta: [{ name: 'description', content: 'Керуйте подіями вашої організації: список та створення' }],
});
</script>


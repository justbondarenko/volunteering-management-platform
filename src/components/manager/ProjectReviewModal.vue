<template>
  <Dialog
    :visible="visible"
    header="Перевірка проекту"
    modal
    :style="{ width: '36rem' }"
    :breakpoints="{ '960px': '90vw', '640px': '96vw' }"
    @update:visible="$emit('update:visible', $event)"
  >
    <div v-if="project" class="space-y-4">
      <div class="space-y-2">
        <div><span class="font-medium">Назва:</span> {{ project.title }}</div>
        <div><span class="font-medium">Організація:</span> {{ project.organizationName }}</div>
        <div><span class="font-medium">Місто:</span> {{ project.city }}</div>
        <div class="whitespace-pre-line"><span class="font-medium">Опис:</span> {{ project.description }}</div>
      </div>

      <div class="pt-2 flex flex-col gap-3">
        <div class="flex gap-2 flex-wrap">
          <Button label="Схвалити" icon="pi pi-check" severity="success" @click="onApprove" />
          <Button label="Відхилити" icon="pi pi-times" severity="danger" @click="rejectVisible = true" />
        </div>

        <div class="space-y-2">
          <Textarea v-model="requestText" placeholder="Запит додаткової інформації" rows="3" />
          <div class="flex justify-end">
            <Button label="Надіслати запит" icon="pi pi-send" @click="onRequest" :disabled="!requestText" />
          </div>
        </div>

        <div v-if="project.requestMessage" class="text-sm text-gray-600">
          Останній запит: {{ project.requestMessage }}
        </div>
      </div>
    </div>

    <Dialog v-model:visible="rejectVisible" header="Причина відхилення" modal :style="{ width: '28rem' }">
      <div class="space-y-3">
        <Textarea v-model="rejectText" placeholder="Вкажіть причину" rows="4" />
        <div class="flex justify-end gap-2">
          <Button label="Скасувати" severity="secondary" @click="rejectVisible = false" />
          <Button label="Відхилити" severity="danger" :disabled="!rejectText" @click="onReject" />
        </div>
      </div>
    </Dialog>
  </Dialog>
</template>

<script setup lang="ts">
import type { AdminProject } from '~/types/admin';

const props = defineProps({
  visible: { type: Boolean, required: true },
  project: { type: Object as PropType<AdminProject | null>, default: null },
});

const emit = defineEmits(['update:visible', 'approve', 'reject', 'request']);

const rejectVisible = ref(false);
const rejectText = ref('');
const requestText = ref('');

function onApprove() {
  emit('approve');
}

function onReject() {
  if (!rejectText.value) return;
  emit('reject', rejectText.value);
  rejectVisible.value = false;
  rejectText.value = '';
}

function onRequest() {
  if (!requestText.value) return;
  emit('request', requestText.value);
  requestText.value = '';
}
</script>

<style scoped></style>



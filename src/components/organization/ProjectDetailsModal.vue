<template>
  <Dialog
    :visible="visible"
    :header="project ? project.name : 'Деталі проекту'"
    :modal="true"
    :style="{ width: '70vw' }"
    :breakpoints="{ '960px': '85vw', '640px': '95vw' }"
    @update:visible="$emit('update:visible', $event)"
  >
    <div v-if="project" class="p-4">
      <!-- Project Status and Basic Info -->
      <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div class="flex items-center gap-3">
          <Tag 
            :value="getStatusLabel(project.status)" 
            :severity="getStatusSeverity(project.status)"
            :icon="getStatusIcon(project.status)"
            class="text-sm"
          />
        </div>
        <div class="flex-1">
          <h2 class="text-xl font-bold">{{ project.name }}</h2>
          <p class="text-gray-600">{{ project.description }}</p>
        </div>
        <div class="flex gap-2">
          <Button 
            :label="isEditing ? 'Скасувати' : 'Редагувати'" 
            :icon="isEditing ? 'pi pi-times' : 'pi pi-pencil'" 
            severity="secondary" 
            @click="toggleEdit"
            outlined
          />
          <Button 
            v-if="isEditing" 
            label="Зберегти" 
            icon="pi pi-check" 
            @click="saveChanges"
            :loading="saving"
          />
        </div>
      </div>

      <!-- Project Details Grid -->
      <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="rounded-lg border p-4">
          <div class="mb-2 flex items-center gap-2">
            <i class="pi pi-calendar text-blue-500"></i>
            <span class="font-semibold">Дата початку</span>
          </div>
          <div v-if="!isEditing" class="text-lg">
            {{ new Date(project.startDate).toLocaleDateString('uk-UA') }}
          </div>
          <Calendar 
            v-else 
            v-model="editForm.startDate" 
            dateFormat="dd/mm/yy" 
            class="w-full"
          />
        </div>

        <div class="rounded-lg border p-4">
          <div class="mb-2 flex items-center gap-2">
            <i class="pi pi-calendar text-green-500"></i>
            <span class="font-semibold">Дата завершення</span>
          </div>
          <div v-if="!isEditing" class="text-lg">
            {{ new Date(project.endDate).toLocaleDateString('uk-UA') }}
          </div>
          <Calendar 
            v-else 
            v-model="editForm.endDate" 
            dateFormat="dd/mm/yy" 
            class="w-full"
          />
        </div>

        <div class="rounded-lg border p-4">
          <div class="mb-2 flex items-center gap-2">
            <i class="pi pi-map-marker text-red-500"></i>
            <span class="font-semibold">Місто</span>
          </div>
          <div v-if="!isEditing" class="text-lg">{{ project.city }}</div>
          <InputText v-else v-model="editForm.city" class="w-full" />
        </div>

        <div class="rounded-lg border p-4">
          <div class="mb-2 flex items-center gap-2">
            <i class="pi pi-home text-purple-500"></i>
            <span class="font-semibold">Адреса</span>
          </div>
          <div v-if="!isEditing" class="text-lg">{{ project.address }}</div>
          <InputText v-else v-model="editForm.address" class="w-full" />
        </div>

        <div class="rounded-lg border p-4">
          <div class="mb-2 flex items-center gap-2">
            <i class="pi pi-users text-orange-500"></i>
            <span class="font-semibold">Волонтери</span>
          </div>
          <div class="text-lg font-bold text-blue-600">
            {{ project.volunteersSigned }} / {{ project.volunteersNeeded }}
          </div>
        </div>

        <div v-if="project.budget" class="rounded-lg border p-4">
          <div class="mb-2 flex items-center gap-2">
            <i class="pi pi-dollar text-green-500"></i>
            <span class="font-semibold">Бюджет</span>
          </div>
          <div class="text-lg font-bold text-green-600">
            {{ project.budget.toLocaleString('uk-UA') }} грн
          </div>
        </div>
      </div>

      <!-- Project Description (Editable) -->
      <div class="mb-6 rounded-lg border p-4">
        <div class="mb-2 flex items-center gap-2">
          <i class="pi pi-file-edit text-indigo-500"></i>
          <span class="font-semibold">Опис проекту</span>
        </div>
        <div v-if="!isEditing" class="text-gray-700">{{ project.description }}</div>
        <Textarea 
          v-else 
          v-model="editForm.description" 
          rows="4" 
          class="w-full"
          placeholder="Опишіть проект..."
        />
      </div>

      <!-- Signed Volunteers Table -->
      <div class="mb-4">
        <div class="mb-3 flex items-center gap-2">
          <i class="pi pi-users text-blue-500"></i>
          <h3 class="text-lg font-semibold">Зареєстровані волонтери ({{ signedVolunteers.length }})</h3>
        </div>
        
        <DataTable 
          :value="signedVolunteers" 
          :paginator="true" 
          :rows="5"
          stripedRows
          responsiveLayout="scroll"
          :loading="volunteersLoading"
        >
          <Column header="Волонтер">
            <template #body="{ data }">
              <div class="flex items-center gap-3">
                <Avatar :label="data.firstName.charAt(0)" shape="circle" size="small" />
                <div>
                  <div class="font-medium">{{ data.firstName }} {{ data.lastName }}</div>
                  <div class="text-sm text-gray-500">{{ data.email }}</div>
                </div>
              </div>
            </template>
          </Column>
          
          <Column field="phone" header="Телефон">
            <template #body="{ data }">
              <div class="flex items-center gap-2">
                <i class="pi pi-phone text-gray-500"></i>
                <span>{{ data.phone }}</span>
              </div>
            </template>
          </Column>
          
          <Column field="rating" header="Рейтинг">
            <template #body="{ data }">
              <div class="flex items-center gap-2">
                <Rating :modelValue="data.rating" :readonly="true" :cancel="false" />
                <span class="text-sm text-gray-500">({{ data.rating }})</span>
              </div>
            </template>
          </Column>
          
          <Column field="city" header="Місто">
            <template #body="{ data }">
              <div class="flex items-center gap-2">
                <i class="pi pi-map-marker text-gray-500"></i>
                <span>{{ data.city }}</span>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- Actions -->
      <div class="mt-6 flex justify-end gap-2">
        <Button 
          label="Закрити" 
          icon="pi pi-times" 
          severity="secondary" 
          @click="closeModal" 
          outlined 
        />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import type { OrganizationProject, OrganizationVolunteer } from '~/types';
import { useOrganizationVolunteersStore } from '~/stores/organizationVolunteers';

// Props
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  project: {
    type: Object as PropType<OrganizationProject | null>,
    default: null,
  },
});

// Emits
const emit = defineEmits(['update:visible']);

// Store
const volunteersStore = useOrganizationVolunteersStore();

// State
const isEditing = ref(false);
const saving = ref(false);
const volunteersLoading = ref(false);
const signedVolunteers = ref<OrganizationVolunteer[]>([]);
const editForm = ref({
  name: '',
  description: '',
  startDate: null as Date | null,
  endDate: null as Date | null,
  city: '',
  address: ''
});

// Watch for project changes
watch(() => props.project, async (newProject) => {
  if (newProject) {
    await loadSignedVolunteers();
    resetEditForm();
  }
}, { immediate: true });

// Load signed volunteers
const loadSignedVolunteers = async () => {
  if (!props.project?.signedVolunteers) return;
  
  volunteersLoading.value = true;
  try {
    // Get all volunteers from store
    const allVolunteers = volunteersStore.volunteers;
    
    // Filter volunteers that are signed to this project
    signedVolunteers.value = allVolunteers.filter(volunteer => 
      props.project?.signedVolunteers.includes(volunteer.id)
    );
  } finally {
    volunteersLoading.value = false;
  }
};

// Reset edit form
const resetEditForm = () => {
  if (props.project) {
    editForm.value = {
      name: props.project.name,
      description: props.project.description,
      startDate: new Date(props.project.startDate),
      endDate: new Date(props.project.endDate),
      city: props.project.city,
      address: props.project.address
    };
  }
};

// Toggle edit mode
const toggleEdit = () => {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) {
    resetEditForm();
  }
};

// Save changes
const saveChanges = async () => {
  if (!props.project) return;
  
  saving.value = true;
  try {
    // Update project in store
    const updates = {
      name: editForm.value.name,
      description: editForm.value.description,
      startDate: editForm.value.startDate?.toISOString() || props.project.startDate,
      endDate: editForm.value.endDate?.toISOString() || props.project.endDate,
      city: editForm.value.city,
      address: editForm.value.address
    };
    
    // Here you would typically call the store's update method
    // For now, we'll just show a success message
    console.log('Project updated:', updates);
    
    isEditing.value = false;
  } finally {
    saving.value = false;
  }
};

// Close modal
const closeModal = () => {
  isEditing.value = false;
  emit('update:visible', false);
};

// Helper functions for status display
const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    draft: 'Чернетка',
    upcoming: 'Майбутній',
    active: 'Активний',
    ended: 'Завершений',
    cancelled: 'Скасований'
  };
  return labels[status] || status;
};

const getStatusSeverity = (status: string) => {
  const severities: Record<string, string> = {
    draft: 'secondary',
    upcoming: 'info',
    active: 'success',
    ended: 'warning',
    cancelled: 'danger'
  };
  return severities[status] || 'secondary';
};

const getStatusIcon = (status: string) => {
  const icons: Record<string, string> = {
    draft: 'pi pi-file-edit',
    upcoming: 'pi pi-clock',
    active: 'pi pi-play',
    ended: 'pi pi-check',
    cancelled: 'pi pi-times'
  };
  return icons[status] || 'pi pi-circle';
};
</script>

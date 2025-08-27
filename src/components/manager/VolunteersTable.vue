<template>
  <div>
    <!-- Volunteers DataTable -->
    <DataTable 
      :value="volunteers" 
      :paginator="true" 
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      stripedRows
      :loading="loading"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Показано {first} - {last} з {totalRecords} волонтерів"
      responsiveLayout="scroll"
    >
      <Column field="firstName" header="Волонтер" sortable>
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <Avatar :image="data.photo" :label="data.firstName.charAt(0)" shape="circle" size="small" />
            <div>
              <p class="font-medium">{{ data.firstName }} {{ data.lastName }}</p>
              <p class="text-xs text-gray-500">{{ data.email }}</p>
            </div>
          </div>
        </template>
      </Column>
      
      <Column field="city" header="Місто" sortable></Column>
      
      <Column field="skills" header="Навички" sortable>
        <template #body="{ data }">
          <div class="flex flex-wrap gap-1">
            <Chip v-for="skill in data.skills.slice(0, 2)" :key="skill" :label="skill" class="text-xs" />
            <Chip v-if="data.skills.length > 2" :label="`+${data.skills.length - 2}`" class="text-xs bg-gray-200" />
          </div>
        </template>
      </Column>
      
      <Column field="rating" header="Рейтинг" sortable>
        <template #body="{ data }">
          <Rating :modelValue="data.rating" :readonly="true" :cancel="false" />
        </template>
      </Column>
      
      <Column field="status" header="Статус" sortable>
        <template #body="{ data }">
          <Tag 
            :value="getStatusLabel(data.status)" 
            :severity="getStatusSeverity(data.status)" 
          />
        </template>
      </Column>
      
      <Column field="joinedDate" header="Дата реєстрації" sortable>
        <template #body="{ data }">
          {{ new Date(data.joinedDate).toLocaleDateString('uk-UA') }}
        </template>
      </Column>
      
      <Column field="completedProjects" header="Проекти" sortable>
        <template #body="{ data }">
          <div class="text-xl font-bold text-green-600">{{ data.completedProjects }}</div>
        </template>
      </Column>
      
      <Column header="Дії" :exportable="false">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button 
              icon="pi pi-eye" 
              rounded 
              text 
              severity="info" 
              @click="viewVolunteer(data)" 
              tooltip="Переглянути"
            />
            <Button 
              icon="pi pi-check" 
              rounded 
              text 
              severity="success" 
              @click="updateStatus(data.id, 'active')" 
              :disabled="data.status === 'active'"
              tooltip="Активувати"
            />
            <Button 
              icon="pi pi-ban" 
              rounded 
              text 
              severity="danger" 
              @click="updateStatus(data.id, 'suspended')" 
              :disabled="data.status === 'suspended'"
              tooltip="Призупинити"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
  volunteers: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

// Emits
const emit = defineEmits(['view-volunteer', 'update-status']);

// View volunteer details
const viewVolunteer = (volunteer: any) => {
  emit('view-volunteer', volunteer);
};

// Update volunteer status
const updateStatus = (id: string, status: 'active' | 'pending' | 'suspended' | 'inactive') => {
  emit('update-status', { id, status });
};

// Get status label for display
const getStatusLabel = (status: string) => {
  switch (status) {
    case 'active': return 'Активний';
    case 'pending': return 'Очікує перевірки';
    case 'suspended': return 'Призупинений';
    case 'inactive': return 'Неактивний';
    default: return status;
  }
};

// Get status severity for Tag component
const getStatusSeverity = (status: string) => {
  switch (status) {
    case 'active': return 'success';
    case 'pending': return 'warning';
    case 'suspended': return 'danger';
    case 'inactive': return 'secondary';
    default: return 'info';
  }
};
</script>

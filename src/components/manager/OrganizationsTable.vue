<template>
  <div>
    <!-- Organizations DataTable -->
    <DataTable 
      :value="organizations" 
      :paginator="true" 
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      stripedRows
      :loading="loading"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Показано {first} - {last} з {totalRecords} організацій"
      responsiveLayout="scroll"
    >
      <Column field="name" header="Назва організації" sortable>
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <Avatar :label="data.name.charAt(0)" shape="circle" size="small" />
            <div>
              <p class="font-medium">{{ data.name }}</p>
              <p class="text-xs text-gray-500">{{ data.email }}</p>
            </div>
          </div>
        </template>
      </Column>
      
      <Column field="edrpou" header="ЄДРПОУ" sortable>
        <template #body="{ data }">
          <div class="font-mono">{{ data.edrpou }}</div>
        </template>
      </Column>
      
      <Column field="city" header="Місто" sortable></Column>
      
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
          <div class="flex items-center gap-1">
            <span class="text-green-600 font-medium">{{ data.completedProjects }}</span>
            <span class="text-gray-400">/</span>
            <span class="text-blue-600 font-medium">{{ data.activeProjects }}</span>
          </div>
          <div class="text-xs text-gray-500">завершені/активні</div>
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
              @click="viewOrganization(data)" 
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
  organizations: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

// Emits
const emit = defineEmits(['view-organization', 'update-status']);

// View organization details
const viewOrganization = (organization: any) => {
  emit('view-organization', organization);
};

// Update organization status
const updateStatus = (id: string, status: 'active' | 'pending' | 'suspended' | 'inactive') => {
  emit('update-status', { id, status });
};

// Get status label for display
const getStatusLabel = (status: string) => {
  switch (status) {
    case 'active': return 'Активна';
    case 'pending': return 'Очікує перевірки';
    case 'suspended': return 'Призупинена';
    case 'inactive': return 'Неактивна';
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

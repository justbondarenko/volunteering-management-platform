<template>
  <div>
    <!-- Projects DataTable -->
    <DataTable 
      :value="projects" 
      :paginator="true" 
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      stripedRows
      :loading="loading"
      :filters="filters"
      filterDisplay="row"
      :globalFilterFields="['name', 'city', 'description']"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Показано {first} - {last} з {totalRecords} проектів"
      responsiveLayout="scroll"
    >
      <Column field="status" header="Статус" sortable>
        <template #body="{ data }">
          <Tag 
            :value="getStatusLabel(data.status)" 
            :severity="getStatusSeverity(data.status)"
            :icon="getStatusIcon(data.status)"
          />
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown 
            v-model="filterModel.value" 
            :options="statusOptions" 
            placeholder="Виберіть статус" 
            class="p-column-filter" 
            :showClear="true"
            @change="filterCallback()"
          />
        </template>
      </Column>
      
      <Column field="name" header="Назва" sortable>
        <template #body="{ data }">
          <div class="font-medium">{{ data.name }}</div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText 
            v-model="filterModel.value" 
            type="text" 
            @input="filterCallback()" 
            class="p-column-filter" 
            placeholder="Пошук за назвою"
          />
        </template>
      </Column>

      <Column field="startDate" header="Дата початку" sortable>
        <template #body="{ data }">
          {{ new Date(data.startDate).toLocaleDateString('uk-UA') }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Calendar 
            v-model="filterModel.value" 
            dateFormat="dd/mm/yy" 
            placeholder="Виберіть дату" 
            class="p-column-filter"
            @date-select="filterCallback()"
          />
        </template>
      </Column>

      <Column field="endDate" header="Дата завершення" sortable>
        <template #body="{ data }">
          {{ new Date(data.endDate).toLocaleDateString('uk-UA') }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Calendar 
            v-model="filterModel.value" 
            dateFormat="dd/mm/yy" 
            placeholder="Виберіть дату" 
            class="p-column-filter"
            @date-select="filterCallback()"
          />
        </template>
      </Column>

      <Column field="city" header="Місто" sortable>
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <i class="pi pi-map-marker text-gray-500"></i>
            <span>{{ data.city }}</span>
          </div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText 
            v-model="filterModel.value" 
            type="text" 
            @input="filterCallback()" 
            class="p-column-filter" 
            placeholder="Пошук за містом"
          />
        </template>
      </Column>

      <Column header="Волонтери" sortable>
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <i class="pi pi-users text-blue-500"></i>
            <span class="font-medium">{{ data.volunteersSigned }} / {{ data.volunteersNeeded }}</span>
          </div>
        </template>
      </Column>
      
      <Column header="Дії" :exportable="false">
        <template #body="{ data }">
          <Button 
            icon="pi pi-eye" 
            rounded 
            text 
            severity="info" 
            @click="viewProject(data)" 
            tooltip="Переглянути деталі"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import type { OrganizationProject } from '~/types';

// Props
const props = defineProps({
  projects: {
    type: Array as PropType<OrganizationProject[]>,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

// Emits
const emit = defineEmits(['view-project']);

// Filters
const filters = ref({
  global: { value: null, matchMode: 'contains' },
  status: { value: null, matchMode: 'equals' },
  name: { value: null, matchMode: 'contains' },
  startDate: { value: null, matchMode: 'dateIs' },
  endDate: { value: null, matchMode: 'dateIs' },
  city: { value: null, matchMode: 'contains' }
});

// Status options for dropdown filter
const statusOptions = ref([
  { label: 'Чернетка', value: 'draft' },
  { label: 'Майбутній', value: 'upcoming' },
  { label: 'Активний', value: 'active' },
  { label: 'Завершений', value: 'ended' },
  { label: 'Скасований', value: 'cancelled' }
]);

// View project details
const viewProject = (project: OrganizationProject) => {
  emit('view-project', project);
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

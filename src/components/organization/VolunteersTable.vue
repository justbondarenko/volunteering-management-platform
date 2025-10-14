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
      :filters="filters"
      filterDisplay="row"
      :globalFilterFields="['firstName', 'lastName', 'email', 'phone']"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Показано {first} - {last} з {totalRecords} волонтерів"
      responsiveLayout="scroll"
    >
      <Column field="firstName" header="Ім'я" sortable>
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <Avatar :label="data.firstName.charAt(0)" shape="circle" size="small" />
            <div>
              <p class="font-medium">{{ data.firstName }} {{ data.lastName }}</p>
            </div>
          </div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText 
            v-model="filterModel.value" 
            type="text" 
            @input="filterCallback()" 
            class="p-column-filter" 
            placeholder="Пошук за ім'ям"
          />
        </template>
      </Column>
      
      <Column field="email" header="Email" sortable>
        <template #filter="{ filterModel, filterCallback }">
          <InputText 
            v-model="filterModel.value" 
            type="text" 
            @input="filterCallback()" 
            class="p-column-filter" 
            placeholder="Пошук за email"
          />
        </template>
      </Column>

      <Column field="phone" header="Телефон" sortable>
        <template #filter="{ filterModel, filterCallback }">
          <InputText 
            v-model="filterModel.value" 
            type="text" 
            @input="filterCallback()" 
            class="p-column-filter" 
            placeholder="Пошук за телефоном"
          />
        </template>
      </Column>
      
      <Column field="rating" header="Рейтинг" sortable>
        <template #body="{ data }">
          <Rating :modelValue="data.rating" :readonly="true" :cancel="false" />
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown 
            v-model="filterModel.value" 
            :options="ratingOptions" 
            placeholder="Виберіть рейтинг" 
            class="p-column-filter" 
            :showClear="true"
            @change="filterCallback()"
          />
        </template>
      </Column>
      
      <Column field="lastWorkedWith" header="Остання активність" sortable>
        <template #body="{ data }">
          {{ new Date(data.lastWorkedWith).toLocaleDateString('uk-UA') }}
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
      
      <Column header="Дії" :exportable="false">
        <template #body="{ data }">
          <Button 
            icon="pi pi-eye" 
            rounded 
            text 
            severity="info" 
            @click="viewVolunteer(data)" 
            tooltip="Переглянути деталі"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import type { OrganizationVolunteer } from '~/types';
type matchMode = 'startsWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'between' | 'dateIs' | 'dateIsNot' | 'dateBefore' | 'dateAfter' | undefined;
// Props
const props = defineProps({
  volunteers: {
    type: Array as PropType<OrganizationVolunteer[]>,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

// Emits
const emit = defineEmits(['view-volunteer']);

// Filters
const filters = ref({
  global: { value: null, matchMode: 'contains' },
  firstName: { value: null, matchMode: 'contains' },
  lastName: { value: null, matchMode: 'contains' },
  email: { value: null, matchMode: 'contains' },
  phone: { value: null, matchMode: 'contains' },
  rating: { value: null, matchMode: 'equals' },
  lastWorkedWith: { value: null, matchMode: 'dateIs' }
});

// Rating options for dropdown filter
const ratingOptions = ref([
  { label: '1 зірка', value: 1 },
  { label: '2 зірки', value: 2 },
  { label: '3 зірки', value: 3 },
  { label: '4 зірки', value: 4 },
  { label: '5 зірок', value: 5 }
]);

// View volunteer details
const viewVolunteer = (volunteer: OrganizationVolunteer) => {
  emit('view-volunteer', volunteer);
};
</script>

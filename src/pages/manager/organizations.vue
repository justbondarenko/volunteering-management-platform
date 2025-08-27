<template>
  <div class="w-full h-full">
    <div class="mb-4">
      <h1 class="text-2xl font-bold">Управління організаціями</h1>
      <p class="text-gray-600">Перегляд та управління організаціями на платформі</p>
    </div>

    <!-- Organizations table -->
    <Card>
      <template #title>
        <div class="flex items-center gap-2">
          <i class="pi pi-building"></i>
          <h2 class="text-xl font-semibold">Організації</h2>
        </div>
      </template>
      <template #content>
        <OrganizationsTable 
          :organizations="organizationsStore.organizations"
          :loading="organizationsStore.isLoading"
          @view-organization="openOrganizationModal"
          @update-status="handleStatusUpdate"
        />
      </template>
    </Card>
    
    <!-- Organization Details Modal -->
    <OrganizationDetailsModal
      v-model:visible="organizationModalVisible"
      :organization="selectedOrganization"
      @status-updated="handleStatusUpdate"
      @feedback-sent="handleFeedback"
    />
  </div>
</template>

<script setup lang="ts">
import { useManagerOrganizationsStore } from '~/stores/managerOrganizations';
import { useToast } from 'primevue/usetoast';
import OrganizationsTable from '~/components/manager/OrganizationsTable.vue';
import OrganizationDetailsModal from '~/components/manager/OrganizationDetailsModal.vue';

// Define page metadata
definePageMeta({
  layout: 'manager',
});

const toast = useToast();
const organizationsStore = useManagerOrganizationsStore();
const router = useRouter();

// Modal state
const organizationModalVisible = ref(false);
const selectedOrganization = ref<any>(null);
const adminFeedback = ref('');
const feedbackType = ref('request'); // 'request' or 'rejection'

// Open organization details modal
const openOrganizationModal = (organization: any) => {
  selectedOrganization.value = organization;
  organizationModalVisible.value = true;
};

// Handle status update from modal or table
const handleStatusUpdate = async (data: { id: string, status: 'active' | 'pending' | 'suspended' | 'inactive' }) => {
  const success = await organizationsStore.updateOrganizationStatus(data.id, data.status);
  
  if (success) {
    toast?.add({
      severity: 'success',
      summary: 'Статус оновлено',
      detail: `Статус організації успішно змінено на "${getStatusLabel(data.status)}"`,
      life: 3000,
    });
    
    // Update the selected organization status if it's still displayed
    if (selectedOrganization.value && selectedOrganization.value.id === data.id) {
      selectedOrganization.value.status = data.status;
    }
  } else {
    toast?.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Не вдалося оновити статус організації',
      life: 5000,
    });
  }
};

// Handle feedback sent from modal
const handleFeedback = async (data: { organizationId: string, type: 'request' | 'rejection', message: string }) => {
  try {
    // Show loading state
    const loadingToast = toast?.add({
      severity: 'info',
      summary: 'Надсилання...',
      detail: 'Обробка запиту',
      life: 3000,
    });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would be an API call
    // const response = await $fetch(`/api/manager/organizations/${data.organizationId}/feedback`, {
    //   method: 'POST',
    //   body: {
    //     type: data.type,
    //     message: data.message,
    //   }
    // });
    
    // Show success message
    toast?.add({
      severity: 'success',
      summary: data.type === 'request' ? 'Запит надіслано' : 'Організацію відхилено',
      detail: data.type === 'request' 
        ? 'Запит додаткової інформації успішно надіслано організації'
        : 'Організацію відхилено з вказаною причиною',
      life: 3000,
    });
    
  } catch (error) {
    toast?.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Не вдалося надіслати повідомлення. Спробуйте ще раз.',
      life: 5000,
    });
  }
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

// SEO
useHead({
  title: 'Управління організаціями',
  meta: [{ name: 'description', content: 'Управління організаціями на платформі волонтерства' }],
});
</script>

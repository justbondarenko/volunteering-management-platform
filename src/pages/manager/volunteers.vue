<template>
  <div class="w-full h-full">
    <div class="mb-4">
      <h1 class="text-2xl font-bold">Управління волонтерами</h1>
      <p class="text-gray-600">Перегляд та управління волонтерами на платформі</p>
    </div>



    <!-- Volunteers table -->
    <Card>
      <template #title>
        <div class="flex items-center gap-2">
          <i class="pi pi-users"></i>
          <h2 class="text-xl font-semibold">Волонтери</h2>
        </div>
      </template>
      <template #content>
        <VolunteersTable 
          :volunteers="volunteersStore.volunteers"
          :loading="volunteersStore.isLoading"
          @view-volunteer="openVolunteerModal"
          @update-status="handleStatusUpdate"
        />
      </template>
    </Card>
    
    <!-- Volunteer Details Modal -->
    <VolunteerDetailsModal
      v-model:visible="volunteerModalVisible"
      :volunteer="selectedVolunteer"
      @status-updated="handleStatusUpdate"
      @feedback-sent="handleFeedback"
    />
  </div>
</template>

<script setup lang="ts">
import { useManagerVolunteersStore } from '~/stores/managerVolunteers';
import { useToast } from 'primevue/usetoast';
import VolunteersTable from '~/components/manager/VolunteersTable.vue';
import VolunteerDetailsModal from '~/components/manager/VolunteerDetailsModal.vue';

// Define page metadata
definePageMeta({
  layout: 'manager',
});

const toast = useToast();
const volunteersStore = useManagerVolunteersStore();
const router = useRouter();

// Modal state
const volunteerModalVisible = ref(false);
const selectedVolunteer = ref<any>(null);

// Open volunteer details modal
const openVolunteerModal = (volunteer: any) => {
  selectedVolunteer.value = volunteer;
  volunteerModalVisible.value = true;
};

// Handle status update from modal or table
const handleStatusUpdate = async (data: { id: string, status: 'active' | 'pending' | 'suspended' | 'inactive' }) => {
  const success = await volunteersStore.updateVolunteerStatus(data.id, data.status);
  
  if (success) {
    toast?.add({
      severity: 'success',
      summary: 'Статус оновлено',
      detail: `Статус волонтера успішно змінено на "${getStatusLabel(data.status)}"`,
      life: 3000,
    });
    
    // Update the selected volunteer status if it's still displayed
    if (selectedVolunteer.value && selectedVolunteer.value.id === data.id) {
      selectedVolunteer.value.status = data.status;
    }
  } else {
    toast?.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Не вдалося оновити статус волонтера',
      life: 5000,
    });
  }
};

// Handle feedback sent from modal
const handleFeedback = async (data: { volunteerId: string, type: 'request' | 'rejection', message: string }) => {
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
    // const response = await $fetch(`/api/manager/volunteers/${data.volunteerId}/feedback`, {
    //   method: 'POST',
    //   body: {
    //     type: data.type,
    //     message: data.message,
    //   }
    // });
    
    // Show success message
    toast?.add({
      severity: 'success',
      summary: data.type === 'request' ? 'Запит надіслано' : 'Волонтера відхилено',
      detail: data.type === 'request' 
        ? 'Запит додаткової інформації успішно надіслано волонтеру'
        : 'Волонтера відхилено з вказаною причиною',
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
    case 'active': return 'Активний';
    case 'pending': return 'Очікує перевірки';
    case 'suspended': return 'Призупинений';
    case 'inactive': return 'Неактивний';
    default: return status;
  }
};

// SEO
useHead({
  title: 'Управління волонтерами',
  meta: [{ name: 'description', content: 'Управління волонтерами на платформі волонтерства' }],
});
</script>

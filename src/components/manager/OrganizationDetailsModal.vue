<template>
  <Dialog 
    :visible="visible" 
    :header="organization?.name || 'Деталі організації'" 
    :modal="true"
    :style="{width: '50vw'}"
    :breakpoints="{'960px': '75vw', '640px': '90vw'}"
    @update:visible="$emit('update:visible', $event)"
  >
    <div v-if="organization" class="p-4">
      <div class="flex flex-col md:flex-row gap-6 mb-4">
        <!-- Organization logo/icon -->
        <div class="flex items-center justify-center">
          <div class="w-32 h-32 rounded-lg bg-gray-100 flex items-center justify-center">
            <i class="pi pi-building text-5xl text-gray-400"></i>
          </div>
        </div>
        
        <!-- Basic info -->
        <div class="flex-1">
          <h2 class="text-xl font-bold mb-2">{{ organization.name }}</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <i class="pi pi-id-card text-primary"></i>
                <span class="font-semibold">ЄДРПОУ:</span>
                <span class="font-mono">{{ organization.edrpou }}</span>
              </div>
              
              <div class="flex items-center gap-2">
                <i class="pi pi-envelope text-primary"></i>
                <span class="font-semibold">Email:</span>
                <span>{{ organization.email }}</span>
              </div>
              
              <div class="flex items-center gap-2">
                <i class="pi pi-phone text-primary"></i>
                <span class="font-semibold">Телефон:</span>
                <span>{{ organization.phone }}</span>
              </div>
            </div>
            
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <i class="pi pi-map-marker text-primary"></i>
                <span class="font-semibold">Місто:</span>
                <span>{{ organization.city }}</span>
              </div>
              
              <div class="flex items-center gap-2">
                <i class="pi pi-calendar text-primary"></i>
                <span class="font-semibold">Дата реєстрації:</span>
                <span>{{ new Date(organization.joinedDate).toLocaleDateString('uk-UA') }}</span>
              </div>
              
              <div class="flex items-center gap-2">
                <i class="pi pi-star text-primary"></i>
                <span class="font-semibold">Рейтинг:</span>
                <Rating :modelValue="organization.rating" :readonly="true" :cancel="false" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Status and projects -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div class="p-3 border rounded-lg">
          <div class="text-sm text-gray-600 mb-1">Статус</div>
          <div class="flex items-center">
            <Tag 
              :value="getStatusLabel(organization.status)" 
              :severity="getStatusSeverity(organization.status)" 
              class="text-base"
            />
          </div>
        </div>
        
        <div class="p-3 border rounded-lg">
          <div class="text-sm text-gray-600 mb-1">Завершені проекти</div>
          <div class="text-xl font-bold text-green-600">{{ organization.completedProjects }}</div>
        </div>
        
        <div class="p-3 border rounded-lg">
          <div class="text-sm text-gray-600 mb-1">Активні проекти</div>
          <div class="text-xl font-bold text-blue-600">{{ organization.activeProjects }}</div>
        </div>
      </div>
      
      <!-- Admin Feedback Form -->
      <div class="mt-6 border-t pt-4">
        <h3 class="text-lg font-semibold mb-3">Форма зворотного зв'язку</h3>
        
        <div class="mb-4">
          <div class="flex items-center gap-2 mb-2">
            <RadioButton 
              v-model="feedbackType" 
              value="request" 
              inputId="feedback-request" 
            />
            <label for="feedback-request" class="font-medium">Запит додаткової інформації</label>
          </div>
          
          <div class="flex items-center gap-2 mb-4">
            <RadioButton 
              v-model="feedbackType" 
              value="rejection" 
              inputId="feedback-rejection" 
            />
            <label for="feedback-rejection" class="font-medium">Причина відхилення</label>
          </div>
          
          <Textarea 
            v-model="adminFeedback" 
            :placeholder="feedbackType === 'request' ? 'Вкажіть, яку додаткову інформацію потрібно надати...' : 'Вкажіть причину відхилення...'" 
            rows="4" 
            class="w-full" 
            autoResize 
          />
        </div>
      </div>
      
      <!-- Actions -->
      <div class="flex justify-end gap-2 mt-4">
        <Button 
          label="Закрити" 
          icon="pi pi-times" 
          severity="secondary" 
          @click="closeModal" 
          outlined
        />
        <Button 
          v-if="feedbackType === 'request'" 
          label="Надіслати запит" 
          icon="pi pi-send" 
          severity="info" 
          @click="sendFeedback('request')" 
          :disabled="!adminFeedback.trim()"
        />
        <Button 
          v-if="feedbackType === 'rejection' && organization.status !== 'suspended'" 
          label="Відхилити" 
          icon="pi pi-ban" 
          severity="danger" 
          @click="sendFeedback('rejection')" 
          :disabled="!adminFeedback.trim()"
        />
        <Button 
          v-if="organization.status !== 'active'" 
          label="Активувати" 
          icon="pi pi-check" 
          severity="success" 
          @click="updateStatus('active')" 
        />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';

// Props
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  organization: {
    type: Object,
    default: null
  }
});

// Emits
const emit = defineEmits(['update:visible', 'status-updated', 'feedback-sent']);

// Dependencies
const toast = useToast();

// State
const adminFeedback = ref('');
const feedbackType = ref('request'); // 'request' or 'rejection'

// Close modal
const closeModal = () => {
  emit('update:visible', false);
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

// Update organization status
const updateStatus = async (status: 'active' | 'pending' | 'suspended' | 'inactive') => {
  if (!props.organization) return;
  
  emit('status-updated', {
    id: props.organization.id,
    status: status
  });
  
  closeModal();
};

// Send feedback to organization
const sendFeedback = async (type: 'request' | 'rejection') => {
  if (!adminFeedback.value.trim() || !props.organization) {
    return;
  }
  
  try {
    // Show loading state
    const loadingToast = toast?.add({
      severity: 'info',
      summary: 'Надсилання...',
      detail: 'Обробка запиту',
      life: 3000,
    });
    
    // Emit feedback event
    emit('feedback-sent', {
      organizationId: props.organization.id,
      type: type,
      message: adminFeedback.value
    });
    
    // If rejection, also update status
    if (type === 'rejection') {
      emit('status-updated', {
        id: props.organization.id,
        status: 'suspended'
      });
    }
    
    // Close modal
    closeModal();
    
  } catch (error) {
    toast?.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Не вдалося надіслати повідомлення. Спробуйте ще раз.',
      life: 5000,
    });
  }
};

// Reset form when modal opens
watch(() => props.visible, (newValue) => {
  if (newValue) {
    adminFeedback.value = '';
    feedbackType.value = 'request';
  }
});
</script>

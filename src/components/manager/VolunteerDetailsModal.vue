<template>
  <Dialog 
    :visible="visible" 
    :header="volunteer ? `${volunteer.firstName} ${volunteer.lastName}` : 'Деталі волонтера'" 
    :modal="true"
    :style="{width: '50vw'}"
    :breakpoints="{'960px': '75vw', '640px': '90vw'}"
    @update:visible="$emit('update:visible', $event)"
  >
    <div v-if="volunteer" class="p-4">
      <div class="flex flex-col md:flex-row gap-6 mb-4">
        <!-- Volunteer photo/avatar -->
        <div class="flex items-center justify-center">
          <div class="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-primary">
            <img 
              v-if="volunteer.photo" 
              :src="volunteer.photo" 
              alt="Volunteer photo" 
              class="w-full h-full object-cover"
            />
            <i v-else class="pi pi-user text-5xl text-gray-400"></i>
          </div>
        </div>
        
        <!-- Basic info -->
        <div class="flex-1">
          <h2 class="text-xl font-bold mb-2">{{ volunteer.firstName }} {{ volunteer.lastName }}</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <i class="pi pi-envelope text-primary"></i>
                <span class="font-semibold">Email:</span>
                <span>{{ volunteer.email }}</span>
              </div>
              
              <div class="flex items-center gap-2">
                <i class="pi pi-phone text-primary"></i>
                <span class="font-semibold">Телефон:</span>
                <span>{{ volunteer.phone }}</span>
              </div>
            </div>
            
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <i class="pi pi-map-marker text-primary"></i>
                <span class="font-semibold">Місто:</span>
                <span>{{ volunteer.city }}</span>
              </div>
              
              <div class="flex items-center gap-2">
                <i class="pi pi-calendar text-primary"></i>
                <span class="font-semibold">Дата реєстрації:</span>
                <span>{{ new Date(volunteer.joinedDate).toLocaleDateString('uk-UA') }}</span>
              </div>
              
              <div class="flex items-center gap-2">
                <i class="pi pi-star text-primary"></i>
                <span class="font-semibold">Рейтинг:</span>
                <Rating :modelValue="volunteer.rating" :readonly="true" :cancel="false" />
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
              :value="getStatusLabel(volunteer.status)" 
              :severity="getStatusSeverity(volunteer.status)" 
              class="text-base"
            />
          </div>
        </div>
        
        <div class="p-3 border rounded-lg">
          <div class="text-sm text-gray-600 mb-1">Завершені проекти</div>
          <div class="text-xl font-bold text-green-600">{{ volunteer.completedProjects }}</div>
        </div>
        
        <div class="p-3 border rounded-lg">
          <div class="text-sm text-gray-600 mb-1">Навички</div>
          <div class="flex flex-wrap gap-1 mt-1">
            <Chip v-for="skill in volunteer.skills" :key="skill" :label="skill" class="text-xs" />
          </div>
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
          v-if="feedbackType === 'rejection' && volunteer.status !== 'suspended'" 
          label="Відхилити" 
          icon="pi pi-ban" 
          severity="danger" 
          @click="sendFeedback('rejection')" 
          :disabled="!adminFeedback.trim()"
        />
        <Button 
          v-if="volunteer.status !== 'active'" 
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
  volunteer: {
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

// Update volunteer status
const updateStatus = async (status: 'active' | 'pending' | 'suspended' | 'inactive') => {
  if (!props.volunteer) return;
  
  emit('status-updated', {
    id: props.volunteer.id,
    status: status
  });
  
  closeModal();
};

// Send feedback to volunteer
const sendFeedback = async (type: 'request' | 'rejection') => {
  if (!adminFeedback.value.trim() || !props.volunteer) {
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
      volunteerId: props.volunteer.id,
      type: type,
      message: adminFeedback.value
    });
    
    // If rejection, also update status
    if (type === 'rejection') {
      emit('status-updated', {
        id: props.volunteer.id,
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

<template>
  <div class="flex w-full h-full flex-col items-center p-4">
    <div class="w-full max-w-4xl">
      <!-- Loading state -->
      <div v-if="volunteerStore.isLoading && !volunteerStore.volunteer" class="flex justify-center items-center py-8">
        <ProgressSpinner />
      </div>

      <!-- Error state -->
      <div v-else-if="volunteerStore.error && !volunteerStore.volunteer" class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-600">{{ volunteerStore.error }}</p>
        <Button label="Спробувати знову" severity="secondary" class="mt-3" @click="volunteerStore.fetchVolunteer" />
      </div>

      <!-- Profile content -->
      <div v-else-if="volunteerStore.volunteer" class="flex flex-col gap-6">
        <!-- Profile header -->
        <Card>
          <template #content>
            <div class="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <!-- Profile photo -->
              <div class="relative flex flex-col items-center justify-center gap-4">
                <div 
                  class="w-40 h-40 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-primary"
                >
                  <img 
                    v-if="volunteerStore.volunteer.photo" 
                    :src="volunteerStore.volunteer.photo" 
                    alt="Profile photo" 
                    class="w-full h-full object-cover"
                  />
                  <i v-else class="pi pi-user text-6xl text-gray-400"></i>
                </div>
                <FileUpload
                  mode="basic"
                  :auto="true"
                  accept="image/*"
                  :maxFileSize="5000000"
                  chooseLabel=""
                  class="absolute bottom-0 right-0"
                  @upload="onUpload"
                  :customUpload="true"
                  :showCancelButton="false"
                >
                  <template #chooseicon>
                    <i class="pi pi-camera text-white"></i>
                  </template>
                </FileUpload>
              </div>

              <!-- Profile info -->
              <div class="flex-1 text-center md:text-left">
                <h1 class="text-2xl font-bold">{{ volunteerStore.fullName }}</h1>
                <p class="text-gray-600">{{ volunteerStore.volunteer.email }}</p>
                
                <div class="flex items-center gap-2 mt-3 justify-center md:justify-start">
                  <i class="pi pi-map-marker"></i>
                  <span>{{ volunteerStore.volunteer.city }}</span>
                </div>
                
                <div class="mt-3">
                  <div class="flex items-center gap-2 justify-center md:justify-start">
                    <span class="font-medium">Рейтинг волонтера:</span>
                    <Rating 
                      v-model="volunteerStore.volunteer.rating" 
                      :readonly="true" 
                      :cancel="false" 
                    />
                    <span class="text-sm text-gray-600">({{ volunteerStore.volunteer.rating }})</span>
                  </div>
                </div>

                <div class="flex items-center gap-2 mt-3 justify-center md:justify-start">
                  <i class="pi pi-calendar"></i>
                  <span>Приєднався: {{ new Date(volunteerStore.volunteer.joinedDate).toLocaleDateString('uk-UA') }}</span>
                </div>

                <div class="flex items-center gap-2 mt-3 justify-center md:justify-start">
                  <i class="pi pi-check-circle"></i>
                  <span>Завершених проектів: {{ volunteerStore.volunteer.completedProjects }}</span>
                </div>
              </div>
            </div>
          </template>
        </Card>

        <!-- Profile form -->
        <Card>
          <template #title>
            <div class="flex items-center gap-2">
              <i class="pi pi-user-edit"></i>
              <h2 class="text-xl font-semibold">Особиста інформація</h2>
            </div>
          </template>
          <template #content>
            <form @submit.prevent="saveProfile" class="flex flex-col gap-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- First Name -->
                <div class="flex flex-col gap-2">
                  <label for="firstName" class="font-medium">Ім'я</label>
                  <InputText
                    id="firstName"
                    v-model="form.firstName"
                    placeholder="Ваше ім'я"
                    :class="{ 'p-invalid': errors.firstName }"
                    aria-describedby="firstName-error"
                    fluid
                  />
                  <small id="firstName-error" class="text-red-500" v-if="errors.firstName">
                    {{ errors.firstName }}
                  </small>
                </div>

                <!-- Last Name -->
                <div class="flex flex-col gap-2">
                  <label for="lastName" class="font-medium">Прізвище</label>
                  <InputText
                    id="lastName"
                    v-model="form.lastName"
                    placeholder="Ваше прізвище"
                    :class="{ 'p-invalid': errors.lastName }"
                    aria-describedby="lastName-error"
                    fluid
                  />
                  <small id="lastName-error" class="text-red-500" v-if="errors.lastName">
                    {{ errors.lastName }}
                  </small>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- City -->
                <div class="flex flex-col gap-2">
                  <label for="city" class="font-medium">Місто</label>
                  <InputText
                    id="city"
                    v-model="form.city"
                    placeholder="Ваше місто"
                    :class="{ 'p-invalid': errors.city }"
                    aria-describedby="city-error"
                    fluid
                  />
                  <small id="city-error" class="text-red-500" v-if="errors.city">
                    {{ errors.city }}
                  </small>
                </div>

                <!-- Phone -->
                <div class="flex flex-col gap-2">
                  <label for="phone" class="font-medium">Телефон</label>
                  <InputText
                    id="phone"
                    v-model="form.phone"
                    placeholder="+380XXXXXXXXX"
                    :class="{ 'p-invalid': errors.phone }"
                    aria-describedby="phone-error"
                    fluid
                  />
                  <small id="phone-error" class="text-red-500" v-if="errors.phone">
                    {{ errors.phone }}
                  </small>
                </div>
              </div>

              <!-- Date of Birth -->
              <div class="flex flex-col gap-2">
                <label for="dateOfBirth" class="font-medium">Дата народження</label>
                <Calendar
                  id="dateOfBirth"
                  v-model="form.dateOfBirth"
                  dateFormat="dd.mm.yy"
                  :showIcon="true"
                  :class="{ 'p-invalid': errors.dateOfBirth }"
                  aria-describedby="dateOfBirth-error"
                  placeholder="Виберіть дату"
                />
                <small id="dateOfBirth-error" class="text-red-500" v-if="errors.dateOfBirth">
                  {{ errors.dateOfBirth }}
                </small>
              </div>

              <!-- Bio -->
              <div class="flex flex-col gap-2">
                <label for="bio" class="font-medium">Про себе</label>
                <Textarea
                  id="bio"
                  v-model="form.bio"
                  rows="4"
                  placeholder="Розкажіть про себе"
                  :class="{ 'p-invalid': errors.bio }"
                  aria-describedby="bio-error"
                  autoResize
                />
                <small id="bio-error" class="text-red-500" v-if="errors.bio">
                  {{ errors.bio }}
                </small>
              </div>

              <!-- Skills -->
              <div class="flex flex-col gap-2">
                <label for="skills" class="font-medium">Навички</label>
                <Chips
                  id="skills"
                  v-model="form.skills"
                  placeholder="Додайте навичку та натисніть Enter"
                  :class="{ 'p-invalid': errors.skills }"
                  aria-describedby="skills-error"
                />
                <small id="skills-error" class="text-red-500" v-if="errors.skills">
                  {{ errors.skills }}
                </small>
              </div>

              <!-- Submit button -->
              <div class="flex justify-end mt-4">
                <Button
                  type="submit"
                  label="Зберегти зміни"
                  icon="pi pi-check"
                  :loading="isSaving"
                  :disabled="isSaving"
                />
              </div>
            </form>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { useVolunteerStore } from '~/stores/volunteer';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
// Define page metadata
definePageMeta({
  layout: 'volunteer',
});

// Initialize store and toast
const volunteerStore = useVolunteerStore();

// Form state
const form = ref({
  firstName: '',
  lastName: '',
  city: '',
  phone: '',
  dateOfBirth: null as Date | null,
  bio: '',
  skills: [] as string[],
});

// Form errors
const errors = ref({
  firstName: '',
  lastName: '',
  city: '',
  phone: '',
  dateOfBirth: '',
  bio: '',
  skills: '',
});

const isSaving = ref(false);

// Form validation schema using Zod
const profileSchema = z.object({
  firstName: z.string().min(2, "Ім'я має містити щонайменше 2 символи"),
  lastName: z.string().min(2, 'Прізвище має містити щонайменше 2 символи'),
  city: z.string().min(2, 'Вкажіть місто'),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, 'Введіть коректний номер телефону'),
  dateOfBirth: z.date().nullable().refine(date => date !== null, {
    message: 'Виберіть дату народження',
  }),
  bio: z.string(),
  skills: z.array(z.string()),
});

// Load volunteer data
onMounted(async () => {
  await volunteerStore.fetchVolunteer();
  
  // Initialize form with volunteer data
  if (volunteerStore.volunteer) {
    form.value = {
      firstName: volunteerStore.volunteer.firstName,
      lastName: volunteerStore.volunteer.lastName,
      city: volunteerStore.volunteer.city,
      phone: volunteerStore.volunteer.phone,
      dateOfBirth: new Date(volunteerStore.volunteer.dateOfBirth),
      bio: volunteerStore.volunteer.bio,
      skills: [...volunteerStore.volunteer.skills],
    };
  }
});

// Handle photo upload
const onUpload = async (event: any) => {
  const file = event.files[0];
  if (file) {
    const success = await volunteerStore.uploadPhoto(file);
    
    if (success) {
      toast?.add({
        severity: 'success',
        summary: 'Фото завантажено',
        detail: 'Ваше фото профілю успішно оновлено',
        life: 3000,
      });
    }
  }
};

// Save profile changes
const saveProfile = async () => {
  // Reset errors
  errors.value = {
    firstName: '',
    lastName: '',
    city: '',
    phone: '',
    dateOfBirth: '',
    bio: '',
    skills: '',
  };
  
  // Validate form
  try {
    profileSchema.parse(form.value);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const zodErrors = err.format();
      
      // Handle flat fields
      const fieldNames = ['firstName', 'lastName', 'city', 'phone', 'bio'] as const;
      fieldNames.forEach(field => {
        if (zodErrors[field]?._errors?.length) {
          errors.value[field] = zodErrors[field]._errors[0];
        }
      });
      
      // Handle date field
      if (zodErrors.dateOfBirth?._errors?.length) {
        errors.value.dateOfBirth = zodErrors.dateOfBirth._errors[0];
      }
      
      // Handle skills array
      if (zodErrors.skills?._errors?.length) {
        errors.value.skills = zodErrors.skills._errors[0];
      }
      
      return;
    }
  }
  
  // Save changes
  isSaving.value = true;
  
  try {
    // Format date to ISO string for storage
    const dateOfBirthStr = form.value.dateOfBirth ? form.value.dateOfBirth.toISOString().split('T')[0] : '';
    
    const success = await volunteerStore.updateVolunteer({
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      city: form.value.city,
      phone: form.value.phone,
      dateOfBirth: dateOfBirthStr,
      bio: form.value.bio,
      skills: form.value.skills,
    });
    
    if (success) {
      toast?.add({
        severity: 'success',
        summary: 'Профіль оновлено',
        detail: 'Ваші дані успішно збережено',
        life: 3000,
      });
    }
  } catch (error) {
    toast?.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Не вдалося зберегти зміни. Спробуйте ще раз.',
      life: 5000,
    });
  } finally {
    isSaving.value = false;
  }
};

// SEO
useHead({
  title: 'Профіль волонтера',
  meta: [{ name: 'description', content: 'Керуйте своїм профілем волонтера' }],
});
</script>

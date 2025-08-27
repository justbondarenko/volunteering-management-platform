<template>
  <div class="flex w-full h-full flex-col items-center p-4">
    <div class="w-full max-w-4xl">
      <!-- Loading state -->
      <div v-if="organizationStore.isLoading && !organizationStore.organization" class="flex justify-center items-center py-8">
        <ProgressSpinner />
      </div>

      <!-- Error state -->
      <div v-else-if="organizationStore.error && !organizationStore.organization" class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-600">{{ organizationStore.error }}</p>
        <Button label="Спробувати знову" severity="secondary" class="mt-3" @click="organizationStore.fetchOrganization" />
      </div>

      <!-- Profile content -->
      <div v-else-if="organizationStore.organization" class="flex flex-col gap-6">
        <!-- Profile header -->
        <Card>
          <template #content>
            <div class="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <!-- Organization logo -->
              <div class="relative flex flex-col items-center justify-center gap-4">
                <div 
                  class="w-40 h-40 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-primary"
                >
                  <img 
                    v-if="organizationStore.organization.logo" 
                    :src="organizationStore.organization.logo" 
                    alt="Organization logo" 
                    class="w-full h-full object-cover"
                  />
                  <i v-else class="pi pi-building text-6xl text-gray-400"></i>
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

              <!-- Organization info -->
              <div class="flex-1 text-center md:text-left">
                <h1 class="text-2xl font-bold">{{ organizationStore.organization.name }}</h1>
                <p class="text-gray-600">{{ organizationStore.organization.email }}</p>
                
                <div class="flex items-center gap-2 mt-3 justify-center md:justify-start">
                  <i class="pi pi-id-card"></i>
                  <span>ЄДРПОУ: {{ organizationStore.organization.edrpou }}</span>
                </div>
                
                <div class="flex items-center gap-2 mt-3 justify-center md:justify-start">
                  <i class="pi pi-map-marker"></i>
                  <span>{{ organizationStore.organization.city }}, {{ organizationStore.organization.address }}</span>
                </div>
                
                <div class="mt-3">
                  <div class="flex items-center gap-2 justify-center md:justify-start">
                    <span class="font-medium">Рейтинг організації:</span>
                    <Rating 
                      v-model="organizationStore.organization.rating" 
                      :readonly="true" 
                      :cancel="false" 
                    />
                    <span class="text-sm text-gray-600">({{ organizationStore.organization.rating }})</span>
                  </div>
                </div>

                <div class="flex items-center gap-2 mt-3 justify-center md:justify-start">
                  <i class="pi pi-calendar"></i>
                  <span>Приєдналась: {{ new Date(organizationStore.organization.joinedDate).toLocaleDateString('uk-UA') }}</span>
                </div>

                <div class="flex items-center gap-2 mt-3 justify-center md:justify-start">
                  <i class="pi pi-check-circle"></i>
                  <span>Завершених проектів: {{ organizationStore.organization.completedProjects }}</span>
                </div>

                <div class="flex items-center gap-2 mt-3 justify-center md:justify-start">
                  <i class="pi pi-flag-fill"></i>
                  <span>Активних проектів: {{ organizationStore.organization.activeProjects }}</span>
                </div>

                <div class="flex items-center gap-3 mt-4 justify-center md:justify-start">
                  <a v-if="organizationStore.organization.website" :href="organizationStore.organization.website" target="_blank" class="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <i class="pi pi-globe text-lg"></i>
                  </a>
                  <a v-if="organizationStore.organization.socialLinks.facebook" :href="organizationStore.organization.socialLinks.facebook" target="_blank" class="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <i class="pi pi-facebook text-lg"></i>
                  </a>
                  <a v-if="organizationStore.organization.socialLinks.instagram" :href="organizationStore.organization.socialLinks.instagram" target="_blank" class="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <i class="pi pi-instagram text-lg"></i>
                  </a>
                  <a v-if="organizationStore.organization.socialLinks.twitter" :href="organizationStore.organization.socialLinks.twitter" target="_blank" class="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <i class="pi pi-twitter text-lg"></i>
                  </a>
                  <a v-if="organizationStore.organization.socialLinks.linkedin" :href="organizationStore.organization.socialLinks.linkedin" target="_blank" class="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <i class="pi pi-linkedin text-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          </template>
        </Card>

        <!-- Organization form -->
        <Card>
          <template #title>
            <div class="flex items-center gap-2">
              <i class="pi pi-building"></i>
              <h2 class="text-xl font-semibold">Інформація про організацію</h2>
            </div>
          </template>
          <template #content>
            <form @submit.prevent="saveProfile" class="flex flex-col gap-4">
              <!-- Organization Name -->
              <div class="flex flex-col gap-2">
                <label for="name" class="font-medium">Назва організації</label>
                <InputText
                  id="name"
                  v-model="form.name"
                  placeholder="Назва вашої організації"
                  :class="{ 'p-invalid': errors.name }"
                  aria-describedby="name-error"
                  fluid
                />
                <small id="name-error" class="text-red-500" v-if="errors.name">
                  {{ errors.name }}
                </small>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- EDRPOU -->
                <div class="flex flex-col gap-2">
                  <label for="edrpou" class="font-medium">ЄДРПОУ</label>
                  <InputText
                    id="edrpou"
                    v-model="form.edrpou"
                    placeholder="1234567890"
                    maxlength="10"
                    :class="{ 'p-invalid': errors.edrpou }"
                    aria-describedby="edrpou-error"
                    fluid
                  />
                  <small id="edrpou-error" class="text-red-500" v-if="errors.edrpou">
                    {{ errors.edrpou }}
                  </small>
                </div>
                
                <!-- City -->
                <div class="flex flex-col gap-2">
                  <label for="city" class="font-medium">Місто</label>
                  <InputText
                    id="city"
                    v-model="form.city"
                    placeholder="Місто"
                    :class="{ 'p-invalid': errors.city }"
                    aria-describedby="city-error"
                    fluid
                  />
                  <small id="city-error" class="text-red-500" v-if="errors.city">
                    {{ errors.city }}
                  </small>
                </div>

                <!-- Address -->
                <div class="flex flex-col gap-2">
                  <label for="address" class="font-medium">Адреса</label>
                  <InputText
                    id="address"
                    v-model="form.address"
                    placeholder="Адреса офісу"
                    :class="{ 'p-invalid': errors.address }"
                    aria-describedby="address-error"
                    fluid
                  />
                  <small id="address-error" class="text-red-500" v-if="errors.address">
                    {{ errors.address }}
                  </small>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <!-- Website -->
                <div class="flex flex-col gap-2">
                  <label for="website" class="font-medium">Веб-сайт</label>
                  <InputText
                    id="website"
                    v-model="form.website"
                    placeholder="https://example.org"
                    :class="{ 'p-invalid': errors.website }"
                    aria-describedby="website-error"
                    fluid
                  />
                  <small id="website-error" class="text-red-500" v-if="errors.website">
                    {{ errors.website }}
                  </small>
                </div>
              </div>

              <!-- Social Links -->
              <div class="flex flex-col gap-2">
                <label class="font-medium">Соціальні мережі</label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Facebook -->
                  <div class="flex items-center gap-2">
                    <i class="pi pi-facebook text-lg"></i>
                    <InputText
                      v-model="form.socialLinks.facebook"
                      placeholder="Facebook URL"
                      fluid
                    />
                  </div>
                  <!-- Instagram -->
                  <div class="flex items-center gap-2">
                    <i class="pi pi-instagram text-lg"></i>
                    <InputText
                      v-model="form.socialLinks.instagram"
                      placeholder="Instagram URL"
                      fluid
                    />
                  </div>
                  <!-- Twitter -->
                  <div class="flex items-center gap-2">
                    <i class="pi pi-twitter text-lg"></i>
                    <InputText
                      v-model="form.socialLinks.twitter"
                      placeholder="Twitter URL"
                      fluid
                    />
                  </div>
                  <!-- LinkedIn -->
                  <div class="flex items-center gap-2">
                    <i class="pi pi-linkedin text-lg"></i>
                    <InputText
                      v-model="form.socialLinks.linkedin"
                      placeholder="LinkedIn URL"
                      fluid
                    />
                  </div>
                </div>
              </div>

              <!-- Categories -->
              <div class="flex flex-col gap-2">
                <label for="categories" class="font-medium">Категорії діяльності</label>
                <Chips
                  id="categories"
                  v-model="form.categories"
                  placeholder="Додайте категорію та натисніть Enter"
                  :class="{ 'p-invalid': errors.categories }"
                  aria-describedby="categories-error"
                />
                <small id="categories-error" class="text-red-500" v-if="errors.categories">
                  {{ errors.categories }}
                </small>
              </div>

              <!-- Description -->
              <div class="flex flex-col gap-2">
                <label for="description" class="font-medium">Опис організації</label>
                <Textarea
                  id="description"
                  v-model="form.description"
                  rows="4"
                  placeholder="Розкажіть про вашу організацію"
                  :class="{ 'p-invalid': errors.description }"
                  aria-describedby="description-error"
                  autoResize
                />
                <small id="description-error" class="text-red-500" v-if="errors.description">
                  {{ errors.description }}
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
import { useOrganizationStore } from '~/stores/organization';
import { useToast } from 'primevue/usetoast';
const toast = useToast();

// Define page metadata
definePageMeta({
  layout: 'organization',
});

// Initialize store and toast
const organizationStore = useOrganizationStore();

// Form state
const form = ref({
  name: '',
  edrpou: '',
  city: '',
  address: '',
  phone: '',
  website: null as string | null,
  description: '',
  categories: [] as string[],
  socialLinks: {
    facebook: null as string | null,
    instagram: null as string | null,
    twitter: null as string | null,
    linkedin: null as string | null,
  },
});

// Form errors
const errors = ref({
  name: '',
  edrpou: '',
  city: '',
  address: '',
  phone: '',
  website: '',
  description: '',
  categories: '',
});

const isSaving = ref(false);

// Form validation schema using Zod
const profileSchema = z.object({
  name: z.string().min(2, 'Назва організації має містити щонайменше 2 символи'),
  edrpou: z.string().length(10, 'ЄДРПОУ має містити 10 цифр').regex(/^\d{10}$/, 'ЄДРПОУ має містити тільки цифри'),
  city: z.string().min(2, 'Вкажіть місто'),
  address: z.string().min(5, 'Вкажіть повну адресу'),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, 'Введіть коректний номер телефону'),
  website: z.string().url('Введіть коректний URL').nullable(),
  description: z.string().min(10, 'Опис має містити щонайменше 10 символів'),
  categories: z.array(z.string()).min(1, 'Вкажіть хоча б одну категорію'),
  socialLinks: z.object({
    facebook: z.string().url('Введіть коректний URL').nullable(),
    instagram: z.string().url('Введіть коректний URL').nullable(),
    twitter: z.string().url('Введіть коректний URL').nullable(),
    linkedin: z.string().url('Введіть коректний URL').nullable(),
  }),
});

// Load organization data
onMounted(async () => {
  await organizationStore.fetchOrganization();
  
  // Initialize form with organization data
  if (organizationStore.organization) {
    form.value = {
      name: organizationStore.organization.name,
      edrpou: organizationStore.organization.edrpou,
      city: organizationStore.organization.city,
      address: organizationStore.organization.address,
      phone: organizationStore.organization.phone,
      website: organizationStore.organization.website,
      description: organizationStore.organization.description,
      categories: [...organizationStore.organization.categories],
      socialLinks: {
        facebook: organizationStore.organization.socialLinks.facebook,
        instagram: organizationStore.organization.socialLinks.instagram,
        twitter: organizationStore.organization.socialLinks.twitter,
        linkedin: organizationStore.organization.socialLinks.linkedin,
      },
    };
  }
});

// Handle logo upload
const onUpload = async (event: any) => {
  const file = event.files[0];
  if (file) {
    const success = await organizationStore.uploadLogo(file);
    
    if (success) {
      toast?.add({
        severity: 'success',
        summary: 'Логотип завантажено',
        detail: 'Логотип вашої організації успішно оновлено',
        life: 3000,
      });
    }
  }
};

// Save profile changes
const saveProfile = async () => {
  // Reset errors
  errors.value = {
    name: '',
    edrpou: '',
    city: '',
    address: '',
    phone: '',
    website: '',
    description: '',
    categories: '',
  };
  
  // Validate form
  try {
    profileSchema.parse(form.value);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const zodErrors = err.format();
      
      // Handle flat fields
      const fieldNames = ['name', 'edrpou', 'city', 'address', 'phone', 'website', 'description'] as const;
      fieldNames.forEach(field => {
        if (zodErrors[field]?._errors?.length) {
          errors.value[field] = zodErrors[field]._errors[0];
        }
      });
      
      // Handle categories array
      if (zodErrors.categories?._errors?.length) {
        errors.value.categories = zodErrors.categories._errors[0];
      }
      
      // Handle nested social links (not showing in UI for simplicity)
      
      return;
    }
  }
  
  // Save changes
  isSaving.value = true;
  
  try {
    const success = await organizationStore.updateOrganization({
      name: form.value.name,
      edrpou: form.value.edrpou,
      city: form.value.city,
      address: form.value.address,
      phone: form.value.phone,
      website: form.value.website,
      description: form.value.description,
      categories: form.value.categories,
      socialLinks: form.value.socialLinks,
    });
    
    if (success) {
      toast?.add({
        severity: 'success',
        summary: 'Профіль оновлено',
        detail: 'Дані вашої організації успішно збережено',
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
  title: 'Профіль організації',
  meta: [{ name: 'description', content: 'Керуйте профілем вашої організації' }],
});
</script>

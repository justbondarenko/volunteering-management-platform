<template>
  <div class="contact-us-container py-8 px-4 md:px-8 max-w-6xl mx-auto">
    <h2 class="text-3xl font-bold text-center mb-8">Зв'язатися з нами</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="contact-info bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">Наші контакти</h3>
        <p class="mb-6">Маєте запитання щодо волонтерства або хочете долучитися? Ми будемо раді вам допомогти!</p>
        
        <div class="contact-details space-y-4">
          <div class="flex items-center">
            <i class="pi pi-map-marker text-xl mr-3 text-primary"></i>
            <span>вул. Волонтерська 123, Київ, Україна</span>
          </div>
          <div class="flex items-center">
            <i class="pi pi-phone text-xl mr-3 text-primary"></i>
            <span>+38 (050) 123-4567</span>
          </div>
          <div class="flex items-center">
            <i class="pi pi-envelope text-xl mr-3 text-primary"></i>
            <span>info@volunteerorg.ua</span>
          </div>
          <div class="flex items-center">
            <i class="pi pi-clock text-xl mr-3 text-primary"></i>
            <span>Пн-Пт: 9:00 - 18:00</span>
          </div>
        </div>
        
        <div class="social-media mt-6">
          <h4 class="text-lg font-medium mb-3">Слідкуйте за нами</h4>
          <div class="flex space-x-4">
            <a href="#" class="text-xl hover:text-primary"><i class="pi pi-facebook"></i></a>
            <a href="#" class="text-xl hover:text-primary"><i class="pi pi-twitter"></i></a>
            <a href="#" class="text-xl hover:text-primary"><i class="pi pi-instagram"></i></a>
            <a href="#" class="text-xl hover:text-primary"><i class="pi pi-linkedin"></i></a>
          </div>
        </div>
      </div>
      
      <div class="contact-form bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">Надіслати повідомлення</h3>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium mb-1">Повне ім'я*</label>
            <InputText 
              id="name" 
              class="w-full" 
              placeholder="Ваше ім'я"
            />
          </div>
          
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium mb-1">Електронна пошта*</label>
            <InputText 
              id="email" 
              type="email"
              class="w-full" 
              placeholder="Ваша електронна пошта"
            />
          </div>
          
          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium mb-1">Номер телефону</label>
            <InputText 
              id="phone" 
              class="w-full" 
              placeholder="Ваш номер телефону"
            />
          </div>
          
          <div class="mb-4">
            <label for="subject" class="block text-sm font-medium mb-1">Тема*</label>
            <Dropdown 
              id="subject" 
              :options="subjectOptions" 
              optionLabel="name" 
              placeholder="Оберіть тему" 
              class="w-full" 
            />
          </div>
          
          <div class="mb-4">
            <label for="message" class="block text-sm font-medium mb-1">Повідомлення*</label>
            <Textarea 
              id="message" 
              rows="5" 
              class="w-full" 
              placeholder="Ваше повідомлення"
            />
          </div>
          
          <div class="mb-4 flex items-start">
            <Checkbox id="consent" :binary="true" />
            <label for="consent" class="ml-2 text-sm">Я даю згоду на збереження та обробку моїх персональних даних*</label>
          </div>
          
          <Button 
            type="submit" 
            label="Надіслати повідомлення" 
            icon="pi pi-send" 
            class="w-full"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';

const subjectOptions = [
  { name: 'Загальне питання' },
  { name: 'Можливості волонтерства' },
  { name: 'Інформація про пожертви' },
  { name: 'Пропозиція партнерства' },
  { name: 'Інформація про заходи' },
  { name: 'Інше' }
];

const handleSubmit = () => {
  // This function would handle form submission in a real implementation
  console.log('Form submitted');
};
</script>

<style scoped>
.contact-us-container {
  scroll-margin-top: 80px;
}
</style>
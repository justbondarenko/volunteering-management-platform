<template>
  <div class="w-full p-16 bg-orange-50/50 rounded-lg border border-gray-200" >
    <div class="flex flex-col items-center justify-center gap-10 max-w-3xl mx-auto">
      <h2 class="text-5xl font-bold text-center ">Як це працює</h2>

      <div class="flex flex-col md:flex-row justify-center items-center gap-8">
        <template v-for="(step, index) in steps" :key="index">
          <!-- Step Card -->
          <div
            class="flex flex-col items-center justify-between p-6 rounded-lg shadow-md bg-white transition-transform duration-300 hover:-translate-y-2 w-64 h-64"
          >
            <div
              class="flex items-center justify-center w-16 h-16 rounded-full mb-4"
              :class="step.iconBg"
            >
              <i class="pi text-3xl" :class="[step.icon, step.iconColor]"></i>
            </div>
            <h3 class="text-xl font-bold mb-2 text-center">{{ step.title }}</h3>
            <p class="text-gray-600 text-center text-sm">{{ step.description }}</p>
          </div>

          <!-- Arrow (except after last step) -->
          <template v-if="index < steps.length - 1">
            <div class="hidden md:flex md:items-center md:justify-center">
              <i class="pi pi-arrow-right text-gray-400 text-3xl"></i>
            </div>
            <div class="flex md:hidden items-center justify-center">
              <i class="pi pi-arrow-down text-gray-400 text-3xl"></i>
            </div>
          </template>
        </template>
      </div>

      <div class="text-center">
        <Button
          label="Почати зараз"
          icon="pi pi-heart"
          class="p-button-raised p-button-rounded"
          size="large"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const steps = [
  {
    title: "Приєднайтесь",
    description:
      "Зареєструйтесь та заповніть інформацію про ваші навички та інтереси",
    icon: "pi-user",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    title: "Знайдіть подію",
    description:
      "Перегляньте доступні проєкти та організації, що відповідають вашим інтересам",
    icon: "pi-search",
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
  },
  {
    title: "Зв'яжіться",
    description: "Надішліть заявку на участь у проєктах, що вас цікавлять",
    icon: "pi-envelope",
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-100",
  },
  {
    title: "Допомогайте",
    description: "Отримайте підтвердження та почніть робити позитивні зміни",
    icon: "pi-check-circle",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
  },
];
</script>

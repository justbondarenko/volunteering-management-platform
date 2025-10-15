<template>
  <Message severity="info" icon="pi pi-code" class="mb-4">
    Це тестова сторінка, використовуйте ці облікові дані для входу:
    <br />
    Email:
    <code>{{ login }}</code>
    <i class="pi ml-2 hover:cursor-pointer" :class="{ 'pi-check': copiedLine === 'login', 'pi-copy': copiedLine !== 'login' }" @click="copy('login')"></i>
    <br />
    Пароль:
    <code>{{ password }}</code>
    <i class="pi ml-2 hover:cursor-pointer" :class="{ 'pi-check': copiedLine === 'password', 'pi-copy': copiedLine !== 'password' }" @click="copy('password')"></i>
  </Message>
</template>

<script setup lang="ts">
import Message from 'primevue/message';
import { copyToClipboard } from '~/lib/utils';

interface Props {
  login: string;
  password: string;
}

const copiedLine = ref('');

const props = defineProps<Props>();

const copy = (key: 'login' | 'password') => {
  const value = key === 'login' ? props.login : props.password;
  copiedLine.value = key;
  setTimeout(() => {  
    copiedLine.value = '';
  }, 1500);
  copyToClipboard(value);
};
</script>

<style lang="scss" scoped></style>

<template>
  <div class="w-full h-full p-4 space-y-4">
    <div class="mb-4">
      <h1 class="text-2xl font-bold">Управління користувачами</h1>
      <p class="text-gray-600">Перегляд та управління користувачами на платформі</p>
    </div>

    <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
      <div class="flex-1 flex flex-col sm:flex-row gap-3">
        <span class="p-input-icon-left w-full sm:w-80">
          <i class="pi pi-search" />
          <InputText v-model="store.search" placeholder="Search name or email" class="w-full" />
        </span>
        <Dropdown :options="statusOptions" optionLabel="label" optionValue="value" v-model="store.status" class="w-full sm:w-48" />
        <Dropdown :options="roleOptions" optionLabel="label" optionValue="value" v-model="store.role" class="w-full sm:w-48" />
      </div>
    </div>

    <DataTable :value="store.sorted" dataKey="id" :loading="store.isLoading" class="text-sm" responsiveLayout="scroll">
      <Column field="id" header="UID" style="width: 10rem" />
      <Column field="name" header="Name" sortable />
      <Column field="email" header="Email" />
      <Column header="Role">
        <template #body="{ data }">
          <Tag :value="data.role" severity="info" />
        </template>
      </Column>
      <Column header="Status">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 'Active' ? 'success' : 'danger'" />
        </template>
      </Column>
      <Column header="Actions" style="width: 14rem">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button size="small" icon="pi pi-pencil" label="Edit" @click="openEdit(data)" />
            <Button size="small" :severity="data.status === 'Active' ? 'danger' : 'success'" :icon="data.status === 'Active' ? 'pi pi-ban' : 'pi pi-check'" :label="data.status === 'Active' ? 'Block' : 'Unblock'" @click="confirmToggle(data)" />
          </div>
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="editVisible" header="Edit User" modal :style="{ width: '32rem' }">
      <div class="space-y-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm">Name</label>
          <InputText v-model="draft.name" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm">Email</label>
          <InputText v-model="draft.email" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm">Role</label>
          <Dropdown v-model="draft.role" :options="roleValues" />
        </div>
        <div class="flex justify-end gap-2">
          <Button label="Cancel" severity="secondary" @click="editVisible=false" />
          <Button label="Save" icon="pi pi-save" @click="saveEdit" />
        </div>
      </div>
    </Dialog>

    <Dialog v-model:visible="confirmVisible" header="Confirm" modal :style="{ width: '28rem' }">
      <p>Are you sure you want to {{ targetUser?.status === 'Active' ? 'block' : 'unblock' }} this user?</p>
      <div class="mt-4 flex justify-end gap-2">
        <Button label="Cancel" severity="secondary" @click="confirmVisible=false" />
        <Button label="Confirm" :severity="targetUser?.status === 'Active' ? 'danger' : 'success'" @click="toggleConfirmed" />
      </div>
    </Dialog>
  </div>
  
</template>

<script setup lang="ts">
import { useManagerUsersStore } from '~/stores/manager-users';
import type { UserProfileAdmin } from '~/types/admin';

useSeoMeta({ title: 'Manager • Users' });

const store = useManagerUsersStore();
onMounted(() => { store.load(); });

const statusOptions = [
  { label: 'All Statuses', value: 'All' },
  { label: 'Active', value: 'Active' },
  { label: 'Blocked', value: 'Blocked' },
];
const roleOptions = [
  { label: 'All Roles', value: 'All' },
  { label: 'User', value: 'User' },
  { label: 'Admin', value: 'Admin' },
  { label: 'Org Rep', value: 'Org Rep' },
];
const roleValues: Array<'User'|'Admin'|'Org Rep'> = ['User','Admin','Org Rep'];

const editVisible = ref(false);
const confirmVisible = ref(false);
const draft = reactive<UserProfileAdmin>({ id: '', name: '', email: '', role: 'User', status: 'Active', createdAt: '' });
const targetUser = ref<UserProfileAdmin | null>(null);

function openEdit(user: UserProfileAdmin) {
  Object.assign(draft, user);
  editVisible.value = true;
}

async function saveEdit() {
  if (!draft.name || !draft.email) return;
  await store.updateUser({ ...draft });
  editVisible.value = false;
}

function confirmToggle(user: UserProfileAdmin) {
  targetUser.value = user;
  confirmVisible.value = true;
}

async function toggleConfirmed() {
  if (!targetUser.value) return;
  await store.toggleStatus(targetUser.value.id);
  confirmVisible.value = false;
}
</script>

<style scoped>
</style>


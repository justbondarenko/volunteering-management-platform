import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
export interface ManagerUser {
  id: string;
  name: string;
  email: string;
}

const mockManager: ManagerUser = {
  id: '1',
  name: 'Адміністратор',
  email: 'admin@example.com',
};

export const useManagerAuthStore = defineStore('manager-auth', () => {
  const manager = ref<ManagerUser | null>(null);
  const isLoggedIn = ref(false);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const initializeAuth = () => {
    if (!process.client) return;
    const saved = localStorage.getItem('manager-logged-in');
    if (saved === 'true') {
      isLoggedIn.value = true;
      manager.value = { ...mockManager };
    }
  };

  if (process.client) initializeAuth();

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      await new Promise((r) => setTimeout(r, 600));
      if (email === mockManager.email && password === 'admin123') {
        isLoggedIn.value = true;
        manager.value = { ...mockManager };
        if (process.client) localStorage.setItem('manager-logged-in', 'true');
        return true;
      }
      throw new Error('Невірні облікові дані');
    } catch (e: any) {
      error.value = e?.message || 'Помилка входу';
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    manager.value = null;
    isLoggedIn.value = false;
    error.value = null;
    if (process.client) localStorage.removeItem('manager-logged-in');
  };

  return {
    manager,
    isLoggedIn,
    isLoading,
    error,
    initializeAuth,
    login,
    logout,
  };
});



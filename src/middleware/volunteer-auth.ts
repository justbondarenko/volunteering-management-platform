export default defineNuxtRouteMiddleware((to, from) => {
  // Check authentication on both server and client
  if (process.server) {
    // On server side, always redirect to login to prevent white screen
    return navigateTo('/volunteers/login');
  }
  
  // On client side, check the store
  if (process.client) {
    const volunteerStore = useVolunteerStore();
    
    // Check if user is logged in
    if (!volunteerStore.isLoggedIn) {
      // Redirect to login page immediately
      return navigateTo('/volunteers/login');
    }
  }
});

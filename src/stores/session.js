import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useSessionStore = defineStore('session', () => {
  const session = ref({});

  const setSession = (data) => {
    session.value = data;
  };

  const clearSession = () => {
    sessionStorage.removeItem('session');
  };

  if (sessionStorage.getItem('session')) {
    session.value = JSON.parse(sessionStorage.getItem('session'));
  }
  
  watch(
    session,
    newSession => {
      sessionStorage.setItem('session', JSON.stringify(newSession));
    },
    { deep: true }
  );

  return { session, setSession, clearSession };
});
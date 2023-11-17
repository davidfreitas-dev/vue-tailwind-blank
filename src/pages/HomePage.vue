<script setup>
import { useRouter } from 'vue-router';
import { useSessionStore } from '@/stores/session';
import { useAuth } from '@/use/useAuth';
import Heading from '@/components/Heading.vue';

const sessionStore = useSessionStore();

const router = useRouter();

const signOut = async () => {
  const response = await logOut();
  
  if (response.status == 'success') {
    sessionStore.clearSession();
    router.push('/signin');
  }
};

const { logOut } = useAuth();
</script>

<template>
  <div class="flex flex-col justify-start items-center h-screen bg-gray-900">
    <Heading
      size="lg"
      text="Seja Bem-vindo!"
      class="my-10"
    />

    <button
      @click="signOut"
      class="py-2.5 px-4 bg-brand rounded font-semibold text-black text-sm w-36 transition-colors hover:bg-brand-hover"
    >
      Sair
    </button>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSessionStore } from '@/stores/session';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Loader from '@/components/Loader.vue';

const sessionStore = useSessionStore();
const router = useRouter();
const isLoading = ref(false);

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  
  isLoading.value = true;

  await signInWithPopup(getAuth(), provider)
    .then((result) => {
      sessionStore.setSession({
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        accessToken: result.user.accessToken
      });

      router.push('/');
    })
    .catch((err) => {
      console.log(err);
    });

  isLoading.value = false;
};
</script>

<template>
  <div class="relative flex py-5 items-center">
    <div class="flex-grow border-t border-gray-500" />
    <span class="flex-shrink mx-4 text-gray-400">ou</span>
    <div class="flex-grow border-t border-gray-500" />
  </div>

  <button
    type="button"
    class="flex flex-row justify-center items-center gap-2 cursor-pointer py-3 px-4 bg-white rounded font-semibold text-black text-sm w-full transition-colors"
    :disabled="isLoading"
    @click="signInWithGoogle"
  >
    <Loader v-if="isLoading" />
    
    <div
      v-else
      class="flex justify-center items-center gap-3"
    >
      <img
        src="@/assets/img/google.svg"
        alt="Logo Google"
        class="w-5 h-5"
      >

      Entrar com Google
    </div>
  </button>
</template>
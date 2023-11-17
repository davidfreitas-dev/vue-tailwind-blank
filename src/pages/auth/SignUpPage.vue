<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useSessionStore } from '@/stores/session';
import { useException } from '@/use/useException';
import { useAuth } from '@/use/useAuth';
import Heading from '@/components/Heading.vue';
import Text from '@/components/Text.vue';
import TextInput from '@/components/TextInput.vue';
import Button from '@/components/Button.vue';
import GoogleButton from '@/components/GoogleButton.vue';

const router = useRouter();
const toast = useToast();
const sessionStore = useSessionStore();
const isLoading = ref(false);

const formData = reactive({
  name: '',
  email: '',
  password: ''
});

const register = async () => {
  isLoading.value = true;

  const response = await signUp(formData);

  isLoading.value = false;

  if (response.status === 'error') {
    const errorMsg = handleException(response.code);
    toast.error(errorMsg);
    return;
  }

  sessionStore.setSession({
    uid: response.data.uid,
    email: response.data.email,
    photo: response.data.photoURL,
    accessToken: response.data.accessToken
  });

  router.push('/');
};

const validateForm = (event) => {
  event.preventDefault();

  if (!formData.name || !formData.email || !formData.password) {
    toast.error('Preencha todos os campos');
    return;
  }

  if (!/\S+@\S+\.\S+/.test(formData.email)) {
    toast.error('Fomato de e-mail inválido');
    return;
  }
  
  register();
};

const { signUp } = useAuth();
const { handleException } = useException();
</script>

<template>
  <div class="flex flex-col items-center justify-start w-full text-gray-100 p-10">
    <header class="flex flex-col items-center">
      <Heading
        size="lg"
        text="Auth System"
        class="mt-4"
      />

      <Text 
        size="lg"
        :text="'Cadastre-se e comece a usar!'"
        class="text-gray-400 mt-1"
      />
    </header>

    <form
      @submit="validateForm"
      class="flex flex-col gap-4 items-stretch w-full max-w-sm mt-10 mb-7"
    >
      <div class="flex flex-col gap-3">
        <label
          class="font-semibold"
          for="lblNome"
        >
          Nome e sobrenome
        </label>

        <TextInput
          v-model="formData.name"
          type="text"
          icon="UserIcon"
          text="John Doe"
        />
      </div>

      <div class="flex flex-col gap-3">
        <label
          class="font-semibold"
          for="lblEmail"
        >
          Endereço de e-mail
        </label>

        <TextInput
          v-model="formData.email"
          type="email"
          icon="EnvelopeIcon"
          text="johndoe@email.com"
        />
      </div>

      <div class="flex flex-col gap-3">
        <label
          class="font-semibold"
          for="lblPassword"
        >
          Sua senha
        </label>

        <TextInput
          v-model="formData.password"
          type="password"
          icon="LockClosedIcon"
          text="**********"
          @on-keyup-enter="validateForm"
        />
      </div>

      <Button
        text="Cadastrar na plataforma"
        :is-loading="isLoading"
        class="mt-4"
      />

      <GoogleButton />
    </form>

    <router-link to="/signin">
      <Text
        size="sm"
        text="Já possuo uma conta"
        class="text-gray-400 cursor-pointer hover:text-brand-hover hover:underline"
      />
    </router-link>
  </div>
</template>
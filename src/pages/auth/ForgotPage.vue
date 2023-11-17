<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useAuth } from '@/use/useAuth';
import { useException } from '@/use/useException';
import Heading from '@/components/Heading.vue';
import Text from '@/components/Text.vue';
import TextInput from '@/components/TextInput.vue';
import Button from '@/components/Button.vue';

const toast = useToast();
const isLoading = ref(false);
const email = ref('');

const handleRecover = async () => {
  isLoading.value = true;

  const response = await passwordReset(email.value);

  isLoading.value = false;

  if (response.status == 'error') {
    const errorMsg = handleException(response.code);
    toast.error(errorMsg);
    return;
  } 
  
  toast.success(response.message);
};

const validateForm = (event) => {
  event.preventDefault();

  if (!email.value) {
    toast.error('Informe seu e-mail.');
    return;
  }
  
  handleRecover();
};

const { passwordReset } = useAuth();
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
        text="Recupere sua senha!"
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
          for="lblEmail"
        >
          Endereço de e-mail
        </label>

        <TextInput
          v-model="email"
          type="email"
          icon="EnvelopeIcon"
          text="johndoe@email.com"
          @on-keyup-enter="validateForm"
        />
      </div>

      <Button
        text="Enviar link de recuperação"
        :is-loading="isLoading"
        class="mt-4"
      />
    </form>

    <router-link to="/signin">
      <Text
        size="sm"
        text="Voltar para a tela de login"
        class="text-gray-400 cursor-pointer hover:text-brand-hover hover:underline"
      />
    </router-link>
  </div>
</template>
<script setup>
import Loader from '@/components/Loader.vue';

const props = defineProps({
  isLoading: Boolean,
  text: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <button
    type="submit"
    class="py-3 px-4 bg-brand hover:bg-brand-hover text-black text-sm font-semibold w-full rounded transition-all duration-200 ease-in active:scale-95"
    :disabled="isLoading"
  >
    <Loader v-if="isLoading" />
    <span v-else>{{ text }}</span>
  </button>
</template>
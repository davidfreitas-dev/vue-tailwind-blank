<script setup>
const props = defineProps({
  size: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <span
    :class="{
      'text-xs': size === 'sm',
      'text-sm': size === 'md',
      'text-md': size === 'lg',
    }"
    class="text-gray-100 font-sans"
  >
    {{ text }}
  </span>
</template>
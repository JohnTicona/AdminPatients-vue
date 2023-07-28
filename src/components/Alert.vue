<script setup lang="ts">
import { computed } from "vue";
import { IAlert } from "../interfaces";

const props = defineProps<{
  alert: IAlert;
}>();

const isError = computed(() => {
  return props.alert.type === "error" ? "bg-red-500" : "bg-green-600";
});
</script>

<template>
  <div
    class="text-white text-center uppercase font-bold rounded-md p-3 mb-3"
    :class="isError"
  >
    <h1>{{ alert.message }}</h1>
  </div>
</template>

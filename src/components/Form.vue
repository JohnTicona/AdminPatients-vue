<script setup lang="ts">
import { reactive, computed } from "vue";
import { IAlert } from "../interfaces/index";
import Alert from "../components/Alert.vue";

const emit = defineEmits([
  "update:pet",
  "update:owner",
  "update:email",
  "update:high",
  "update:symptoms",
  "add-patient",
]);

const props = defineProps<{
  id: string | null;
  pet: string;
  owner: string;
  email: string;
  high: string;
  symptoms: string;
}>();

const alert: IAlert = reactive({
  type: "",
  message: "",
});

const editing = computed(() => {
  return props.id;
});

const handleSubmit = () => {
  if (Object.values(props).includes("")) {
    alert.type = "error";
    alert.message = "Todos los campos son obligatorios";
    return;
  }
  emit("add-patient");
};
</script>

<template>
  <div class="md:w-1/2">
    <h2 class="font-black text-3xl text-center">Seguimiento Pacientes</h2>

    <p class="text-lg mt-5 text-center mb-8">
      Añade Pacientes y
      <span class="text-indigo-600 font-bold">Adminístralos</span>
    </p>

    <Alert v-if="alert.message" :alert="alert" />

    <form
      class="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      @submit.prevent="handleSubmit"
    >
      <div class="mb-5">
        <label for="pet" class="block text-gray-700 uppercase font-bold">
          Mascota:
        </label>
        <input
          id="pet"
          type="text"
          placeholder="Nombre de la mascota"
          autocomplete="off"
          class="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          :value="pet"
          @input="
            $emit('update:pet', ($event.target as HTMLInputElement).value)
          "
        />
      </div>

      <div class="mb-5">
        <label for="owner" class="block text-gray-700 uppercase font-bold">
          Propietario:
        </label>
        <input
          id="owner"
          type="text"
          placeholder="Nombre del propietario"
          autocomplete="off"
          class="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          :value="owner"
          @input="
            $emit('update:owner', ($event.target as HTMLInputElement).value)
          "
        />
      </div>

      <div class="mb-5">
        <label for="email" class="block text-gray-700 uppercase font-bold">
          Correo:
        </label>
        <input
          id="email"
          type="email"
          placeholder="Correo del propietario"
          autocomplete="off"
          class="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          :value="email"
          @input="
            $emit('update:email', ($event.target as HTMLInputElement).value)
          "
        />
      </div>

      <div class="mb-5">
        <label for="high" class="block text-gray-700 uppercase font-bold">
          Alta:
        </label>
        <input
          id="high"
          type="date"
          class="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          :value="high"
          @input="
            $emit('update:high', ($event.target as HTMLInputElement).value)
          "
        />
      </div>

      <div class="mb-5">
        <label for="symptoms" class="block text-gray-700 uppercase font-bold">
          Síntomas:
        </label>
        <textarea
          id="symptoms"
          placeholder="Describe los síntomas"
          class="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          :value="symptoms"
          @input="
            $emit('update:symptoms', ($event.target as HTMLInputElement).value)
          "
        />
      </div>

      <input
        type="submit"
        class="w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3 cursor-pointer transition-colors rounded-md"
        :value="[editing ? 'Guardar cambios' : 'Registrar Paciente']"
      />
    </form>
  </div>
</template>

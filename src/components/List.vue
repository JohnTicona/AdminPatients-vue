<script setup lang="ts">
import Patient from "../components/Patient.vue";
import { IPatient } from "../interfaces";

defineProps<{
  patients: IPatient[];
  updatePatient: (id: string) => void;
  deletePatient: (id: string) => void;
}>();
</script>

<template>
  <div class="md:w-1/2">
    <h2 class="font-black text-3xl text-center">Administra tus pacientes</h2>
    <p class="text-lg mt-5 text-center mb-10">
      Administra tus
      <span class="text-indigo-600 font-bold">Pacientes y citas</span>
    </p>

    <div v-if="patients.length > 0">
      <Patient
        v-for="(patient, i) in patients"
        :key="i"
        :patient="patient"
        @update-patient="updatePatient"
        @delete-patient="deletePatient"
      />
    </div>
    <p v-else class="mt-20 text-2xl text-center">No hay Pacientes</p>
  </div>
</template>

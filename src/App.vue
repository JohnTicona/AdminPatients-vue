<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import { uid } from "uid";
import Header from "./components/Header.vue";
import Form from "./components/Form.vue";
import List from "./components/List.vue";
import { IPatient } from "./interfaces";

const patients = ref<IPatient[]>([]);

const patient: IPatient = reactive({
  id: null,
  pet: "",
  owner: "",
  email: "",
  high: "",
  symptoms: "",
});

const saveLocalStorage = () => {
  window.localStorage.setItem("patients", JSON.stringify(patients.value));
};

onMounted(() => {
  const patientsStorage = JSON.parse(
    window.localStorage.getItem("patients") || "[]"
  );

  if (patientsStorage.length > 0) {
    patients.value = patientsStorage;
  }
});

watch(
  patients,
  () => {
    saveLocalStorage();
  },
  { deep: true }
);

const savePatient = () => {
  if (patient.id) {
    const { id } = patient;
    const i = patients.value.findIndex(
      (patientState) => patientState.id === id
    );
    patients.value[i] = { ...patient };
  } else {
    patients.value.push({ ...patient, id: uid() });
  }

  // reset object
  patient.id = null;
  patient.pet = "";
  patient.owner = "";
  patient.email = "";
  patient.high = "";
  patient.symptoms = "";
};

const updatePatient = (id: string) => {
  const editPatient = patients.value.find((patient) => patient.id === id);
  Object.assign(patient, editPatient);
};

const deletePatient = (id: string) => {
  patients.value = patients.value.filter(
    (patientState) => patientState.id !== id
  );
};
</script>

<template>
  <div class="container mx-auto">
    <Header />

    <div class="mt-12 md:flex">
      <Form
        :id="patient.id"
        v-model:pet="patient.pet"
        v-model:owner="patient.owner"
        v-model:email="patient.email"
        v-model:high="patient.high"
        v-model:symptoms="patient.symptoms"
        @add-patient="savePatient"
      />
      <List
        :patients="patients"
        :updatePatient="updatePatient"
        :deletePatient="deletePatient"
      />
    </div>
  </div>
</template>

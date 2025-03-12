<template>
  <ThemeSwitcher />
  <div class="card flex flex-col gap-6">
    <div class="flex justify-between items-center">
      <div class="w-4/12 md:w-2/12">City</div>
      <Select
        v-model="selectedCity"
        :options="cities"
        optionLabel="name"
        placeholder="Select a City"
        class="w-8/12 min-w-48"
      />
    </div>
    <div class="flex justify-between items-center">
      <div class="w-4/12 md:w-2/12">City</div>
      <Select
        v-model="selectedCity"
        :options="cities"
        optionLabel="name"
        placeholder="Select a City"
        class="w-8/12 min-w-48"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedCity = ref();
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
]);
</script>

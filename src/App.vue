<script setup>

import { RouterLink, RouterView } from 'vue-router';
import headerCom from '@/components/header.vue';


</script>

<template>
  <section>
    <headerCom></headerCom>

  </section>
  <RouterView />
</template>

<style scoped>

</style>

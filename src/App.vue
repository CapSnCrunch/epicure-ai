<template>
  <v-app>
    <TheNavbar />
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script setup>
import TheNavbar from "@/components/TheNavbar.vue";
</script>

<template>
  <v-app>
    <div
      style="
        height: 15px;
        background-image: url('https://www.loveandlemons.com/wp-content/themes/loveandlemons5/images/lnl-header-embellishment.png');
        background-size: 30px 15px;
        background-repeat: repeat-x;
      "
    />
    <TheNavbar />
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script setup>
import TheNavbar from "@/components/TheNavbar.vue";
</script>

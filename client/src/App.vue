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
    <TheAppBar :class="{ 'fixed-background': isTop }" />
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script setup>
import TheAppBar from "@/components/TheAppBar.vue";
import TheFooter from "@/components/TheFooter.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";

const isTop = ref(true);

const handleScroll = () => {
  isTop.value = window.scrollY === 0;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style>
.fixed-background {
  margin-top: 15px;
}
</style>

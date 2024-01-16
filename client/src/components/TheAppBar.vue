<template>
  <v-app-bar app elevation="0">
    <v-container class="d-flex align-center" style="max-width: 960px">
      <!-- <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template> -->

      <router-link
        :to="{ name: 'home' }"
        style="text-decoration: none; color: inherit"
      >
        <h1 class="mx-4" style="font-size: 20px">Epicure AI</h1>
      </router-link>

      <router-link
        :to="{ name: 'home' }"
        style="text-decoration: none; color: inherit"
      >
        <div class="ml-8">
          <h1 style="font-size: 12px; font-weight: 400">HOME</h1>
        </div>
      </router-link>

      <router-link
        :to="{ name: 'home' }"
        style="text-decoration: none; color: inherit"
      >
        <div class="ml-8">
          <h1 style="font-size: 12px; font-weight: 400">ABOUT</h1>
        </div>
      </router-link>

      <router-link
        :to="{ name: 'home' }"
        style="text-decoration: none; color: inherit"
      >
        <div class="ml-8">
          <h1 style="font-size: 12px; font-weight: 400">SUBSCRIBE</h1>
        </div>
      </router-link>

      <router-link
        :to="{ name: 'home' }"
        style="text-decoration: none; color: inherit"
      >
        <div class="ml-8">
          <h1 style="font-size: 12px; font-weight: 400">CONTACT</h1>
        </div>
      </router-link>

      <v-spacer></v-spacer>

      <v-text-field
        class="mr-4"
        v-model="search"
        density="compact"
        variant="solo"
        label="Search for a recipe"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @update:modelValue="limitSearch"
        @click:append-inner="submit"
        @keydown.enter="submit"
      ></v-text-field>

      <v-btn icon class="mr-2">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <!-- <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn> -->
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { stringToKebabCase } from "@/modules/util.js";

const router = useRouter();

let search = ref("");

const SEARCH_LIMIT_MAX_CHARACTERS = 30;
const limitSearch = () => {
  if (search.value.length > SEARCH_LIMIT_MAX_CHARACTERS) {
    search = ref(search.value.slice(0, SEARCH_LIMIT_MAX_CHARACTERS));
  }
};

const submit = async () => {
  router.push({
    name: "search",
    params: {
      search: stringToKebabCase(search.value),
    },
  });
};
</script>

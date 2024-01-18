<template>
  <v-container class="d-flex flex-column align-center">
    <h1 style="font-size: 60px; font-weight: 800; margin-top: 20px">
      Epicure AI
    </h1>
    <h1 style="font-size: 32px; font-weight: 400">
      The Omnivore's Oracle: Your Source for Every Recipe Ever Conceived
    </h1>
    <div v-if="loading" class="d-flex justify-center mt-14">
      <img src="../assets/food-loader.gif" width="300" height="300" />
    </div>
    <v-container
      v-else
      class="d-flex flex-column mt-8"
      style="max-width: 960px"
    >
      <hr
        class="w-100 mb-8"
        style="border: 0; height: 1px; background-color: lightgray"
      />
      <h1>Search results for "{{ search }}"</h1>
      <v-row class="mt-6">
        <v-col
          v-for="recipe in recipes.similarRecipes"
          :key="recipe.name"
          cols="12"
          md="4"
          lg="4"
          xl="4"
          class="mb-6"
        >
          <v-row class="d-flex flex-column align-center">
            <router-link
              class="mt-4"
              :to="{
                name: 'recipe',
                params: {
                  recipeId: recipe.recipeId,
                },
              }"
            >
              <img :src="recipe.imageUrl" width="275" height="275" />
            </router-link>
            <h1 style="font-size: 20px; font-weight: 400; text-align: center">
              {{ recipe.name }}
            </h1>
          </v-row>
        </v-col>

        <v-col cols="12" md="4" lg="4" xl="4" class="mb-6">
          <v-row class="d-flex flex-column align-center">
            <router-link
              class="d-flex align-center justify-center mt-4"
              style="background-color: #dbecf9; width: 275px; height: 275px"
              :to="{
                name: 'recipe',
                params: {
                  recipeId: search,
                },
              }"
            >
              <img src="../assets/menu-book-icon.svg" width="48" height="48" />
            </router-link>
            <h1 style="font-size: 20px; font-weight: 400; color: black">
              Generate a new recipe!
            </h1>
          </v-row>
        </v-col>
      </v-row>
      <h1 class="mt-4">Other recipes you might enjoy</h1>
      <v-row class="mt-6">
        <v-col
          v-for="recipe in recipes.complimentaryRecipes"
          :key="recipe.recipeId"
          cols="12"
          md="4"
          lg="4"
          xl="4"
          class="mb-6"
        >
          <v-row class="d-flex flex-column align-center">
            <router-link
              class="mt-4"
              :to="{
                name: 'recipe',
                params: {
                  recipeId: recipe.recipeId,
                },
              }"
            >
              <img :src="recipe.imageUrl" width="275" height="275" />
            </router-link>
            <h1 style="font-size: 20px; font-weight: 400; text-align: center">
              {{ recipe.name }}
            </h1>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { searchRecipes } from "../modules/recipe.js";
import { useRoute } from "vue-router";
import { stringToKebabCase } from "@/modules/util.js";
// import { useDisplay } from "vuetify";

const route = useRoute();

let loading = ref(false);
let recipes = ref(null);
let search = stringToKebabCase(route.params.search);

const loadRecipes = async () => {
  loading.value = true;

  recipes.value = await searchRecipes(search);

  loading.value = false;
};

loadRecipes();
</script>

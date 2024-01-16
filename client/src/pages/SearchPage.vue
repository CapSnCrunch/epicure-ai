<template>
  <v-container class="d-flex flex-column align-center">
    <div v-if="loading" class="d-flex justify-center mt-14">
      <img src="../assets/food-loader.gif" width="300" height="300" />
    </div>
    <v-container
      v-else
      class="d-flex flex-column mt-8"
      style="max-width: 960px"
    >
      <h1>Search results</h1>
      <v-row class="mt-6">
        <v-col
          v-for="recipe in recipes.similarRecipes"
          :key="recipe.name"
          cols="12"
          md="4"
          lg="4"
          xl="4"
          class="mb-10"
        >
          <v-row class="d-flex flex-column align-center">
            <h1 style="font-size: 16px; font-weight: 800; text-align: center">
              {{ recipe.name }}
            </h1>

            <router-link
              class="mt-4"
              :to="{
                name: 'recipe',
                params: {
                  recipeId: recipe.recipeId,
                },
              }"
            >
              <img :src="recipe.imageUrl" width="200" height="200" />
            </router-link>
          </v-row>
        </v-col>

        <v-col cols="12" md="4" lg="4" xl="4" class="mb-10">
          <v-row class="d-flex flex-column align-center">
            <h1 style="font-size: 16px; font-weight: 800; color: black">
              Generate a new recipe!
            </h1>
            <router-link
              class="d-flex align-center justify-center mt-4"
              style="background-color: #dbecf9; width: 200px; height: 200px"
              :to="{
                name: 'recipe',
                params: {
                  recipeId: search,
                },
              }"
            >
              <img src="../assets/menu-book-icon.svg" width="48" height="48" />
            </router-link>
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
          class="mb-10"
        >
          <v-row class="d-flex flex-column align-center">
            <h1 style="font-size: 16px; font-weight: 800; text-align: center">
              {{ recipe.name }}
            </h1>

            <router-link
              class="mt-4"
              :to="{
                name: 'recipe',
                params: {
                  recipeId: recipe.recipeId,
                },
              }"
            >
              <img :src="recipe.imageUrl" width="200" height="200" />
            </router-link>
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

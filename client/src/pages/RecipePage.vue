<template>
  <v-container class="d-flex flex-column mt-8" style="max-width: 960px">
    <div v-if="loading">
      <h1>Loading...</h1>
    </div>
    <div v-else-if="!loading && error != null">
      <h1 style="font-size: 24px; font-weight: 800">Cannot Generate Recipe</h1>
      <h1 style="font-size: 18px; font-weight: 400; margin-top: 10px">
        {{ error }}
      </h1>
    </div>
    <div v-else class="d-flex flex-column align-center mt-4">
      <h1 style="font-size: 42px">{{ recipe.name }}</h1>
      <p class="mt-4 text-center" style="font-size: 18px">
        {{ recipe.description }}
      </p>
      <v-container class="mt-8">
        <v-row class="d-flex">
          <v-col
            :cols="mdAndDown ? 12 : 6"
            class="d-flex align-center justify-center"
          >
            <img :src="recipe.imageUrl" width="512" height="512" />
          </v-col>
          <v-col
            :cols="mdAndDown ? 12 : 6"
            class="d-flex flex-column justify-center align-center mb-14"
          >
            <h2>Ingredients</h2>
            <ul class="mt-2 ml-8 pl-10">
              <li
                v-for="(ingredient, ingredientIndex) of recipe.ingredients"
                :key="`ingredient-${ingredientIndex}`"
                class="mt-2"
              >
                {{ ingredient }}
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-container>
      <v-container
        class="d-flex flex-column justify-space-between"
        :class="xlAndUp ? 'w-75' : 'w-100'"
      >
        <h2>Instructions</h2>
        <ol class="mt-2 ml-10">
          <li
            v-for="(instruction, instructionIndex) of recipe.instructions"
            :key="`instruction-${instructionIndex}`"
            class="mt-4"
          >
            {{ instruction }}
          </li>
        </ol>
      </v-container>
      <v-container class="d-flex flex-column">
        <v-row><h2 class="mt-10">Similar Recipes</h2></v-row>
        <v-row class="d-flex justify-space-around mt-6">
          <v-col
            v-for="similarRecipe of recipe.similarRecipes"
            :key="similarRecipe"
            :cols="smAndDown ? 12 : mdAndDown ? 4 : 2"
            class="d-flex justify-center"
          >
            <router-link :to="`/recipe/${stringToKebabCase(similarRecipe)}`">
              {{ similarRecipe }}
            </router-link>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="d-flex flex-column">
        <v-row><h2 class="mt-10">Complimentary Recipes</h2></v-row>
        <v-row class="d-flex justify-space-around mt-6">
          <v-col
            v-for="complimentaryRecipe of recipe.complimentaryRecipes"
            :key="complimentaryRecipe"
            :cols="smAndDown ? 12 : mdAndDown ? 4 : 2"
            class="d-flex justify-center"
          >
            <router-link
              :to="`/recipe/${stringToKebabCase(complimentaryRecipe)}`"
            >
              {{ complimentaryRecipe }}
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getRecipe } from "../modules/recipe.js";
import { stringToKebabCase } from "@/modules/util.js";
import { useDisplay } from "vuetify";

const route = useRoute();
const { smAndDown, mdAndDown, xlAndUp } = useDisplay();

let loading = ref(false);
let recipe = ref(null);
let error = ref(null);

const loadRecipe = async () => {
  loading.value = true;

  let recipeId = stringToKebabCase(route.params.recipeId);
  const response = await getRecipe(recipeId);
  if (!response.error) {
    recipe.value = response;
  } else {
    error.value = response.message;
  }

  loading.value = false;
};

loadRecipe();
</script>

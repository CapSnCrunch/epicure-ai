<template>
  <v-container>
    <div v-if="loading">
      <h1>Loading...</h1>
    </div>
    <div v-else class="d-flex flex-column align-center mt-4">
      <h1 style="font-size: 42px">{{ recipe.name }}</h1>
      <p
        class="mt-4 text-center"
        :class="xlAndUp ? 'w-50' : 'w-100'"
        style="font-size: 18px"
      >
        {{ recipe.description }}
      </p>
      <v-container class="d-flex mt-8" :class="xlAndUp ? 'w-75' : 'w-100'">
        <v-row class="d-flex">
          <v-col
            :cols="mdAndDown ? 12 : 6"
            class="d-flex align-center justify-center"
          >
            <img :src="imageUrl" width="512" height="512" />
          </v-col>
          <v-col
            :cols="mdAndDown ? 12 : 6"
            class="d-flex flex-column align-center"
          >
            <h2>Ingredients</h2>
            <ul class="mt-6 ml-10">
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
      <v-container
        class="d-flex flex-column"
        :class="xlAndUp ? 'w-75' : 'w-100'"
      >
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
      <v-container
        class="d-flex flex-column"
        :class="xlAndUp ? 'w-75' : 'w-100'"
      >
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
import { generateRecipe, generateImage } from "../modules/recipeGeneration";
import {
  stringToKebabCase,
  kebabCaseToLowerCaseWithSpaces,
} from "@/modules/util.js";
import { useDisplay } from "vuetify";

const route = useRoute();
const { smAndDown, mdAndDown, xlAndUp } = useDisplay();

let loading = ref(false);
let recipe = ref(null);
let imageUrl = ref("");

const loadRecipe = async () => {
  loading.value = true;

  let recipeName = kebabCaseToLowerCaseWithSpaces(route.params.recipeName);
  recipe.value = await generateRecipe(recipeName);
  // imageUrl.value = await generateImage(recipe.value.name);

  loading.value = false;
};

loadRecipe();
</script>

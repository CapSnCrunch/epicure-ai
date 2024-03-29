<template>
  <v-container class="d-flex flex-column mt-8" style="max-width: 960px">
    <div v-if="loading" class="d-flex justify-center mt-14">
      <img src="../assets/food-loader.gif" width="300" height="300" />
    </div>
    <div v-else-if="!loading && error != null">
      <h1 style="font-size: 24px; font-weight: 800">Cannot Generate Recipe</h1>
      <h1 style="font-size: 18px; font-weight: 400; margin-top: 10px">
        {{ error }}
      </h1>
    </div>
    <div v-else class="d-flex flex-column align-center mt-4">
      <h1 style="font-size: 48px">{{ recipe.name }}</h1>
      <h1 style="font-size: 32px; font-weight: 400; text-align: center">
        {{ recipe.shortDescription }}
      </h1>

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
            class="d-flex align-center justify-center"
          >
            <p class="ml-12" style="font-size: 20px">
              {{ splitSentences(recipe.description)[0] }}
            </p>
          </v-col>
        </v-row>
      </v-container>

      <p class="mt-4" style="font-size: 20px">
        {{ splitSentences(recipe.description)[1] }}
      </p>

      <v-container class="mt-8">
        <v-row class="d-flex justify-center">
          <h2 style="font-size: 32px">Ingredients</h2>
        </v-row>
        <v-row class="d-flex">
          <v-col
            :cols="mdAndDown ? 12 : 6"
            class="d-flex flex-column justify-center align-center mb-14"
          >
            <ul class="mt-2 ml-8 pl-10">
              <li
                v-for="(
                  ingredient, ingredientIndex
                ) of recipe.ingredients.slice(
                  Math.ceil(recipe.ingredients.length / 2)
                )"
                :key="`ingredient-${ingredientIndex}`"
                class="mt-2"
                style="font-size: 20px"
              >
                {{ ingredient }}
              </li>
            </ul>
          </v-col>
          <v-col
            :cols="mdAndDown ? 12 : 6"
            class="d-flex flex-column justify-center align-center mb-14"
          >
            <ul class="mt-2 ml-8 pl-10">
              <li
                v-for="(
                  ingredient, ingredientIndex
                ) of recipe.ingredients.slice(
                  0,
                  Math.ceil(recipe.ingredients.length / 2)
                )"
                :key="`ingredient-${ingredientIndex}`"
                class="mt-2"
                style="font-size: 20px"
              >
                {{ ingredient }}
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="d-flex flex-column justify-space-between w-100">
        <h2 style="font-size: 32px">Instructions</h2>
        <ol class="mt-2 ml-10">
          <li
            v-for="(instruction, instructionIndex) of recipe.instructions"
            :key="`instruction-${instructionIndex}`"
            class="mt-4"
            style="font-size: 20px"
          >
            {{ instruction }}
          </li>
        </ol>
      </v-container>

      <v-container
        v-if="recipe.tips"
        class="d-flex flex-column justify-space-between w-100 mt-6"
      >
        <h2 style="font-size: 32px">Recipe Tips</h2>
        <div
          v-for="(tip, tipIndex) of recipe.tips"
          :key="`tip-${tipIndex}`"
          class="mt-6"
          style="font-size: 20px"
        >
          <span style="font-weight: 800">
            {{ splitAroundFirstPeriodOrComma(tip)[0] }},
          </span>
          {{ splitAroundFirstPeriodOrComma(tip)[1] }}
        </div>
      </v-container>

      <v-container class="d-flex flex-column">
        <v-row
          ><h2 class="mt-10" style="font-size: 32px">Similar Recipes</h2></v-row
        >
        <v-row class="d-flex justify-space-around mt-6">
          <v-col
            v-for="similarRecipe of recipe.similarRecipes"
            :key="similarRecipe"
            :cols="smAndDown ? 12 : mdAndDown ? 4 : 2"
            class="d-flex justify-center"
          >
            <router-link
              style="text-decoration: underline; color: #5d90b5"
              :to="`/recipe/${stringToKebabCase(similarRecipe)}`"
            >
              <h1 style="font-size: 20px; font-weight: 400">
                {{ similarRecipe }}
              </h1>
            </router-link>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="d-flex flex-column">
        <v-row
          ><h2 class="mt-10" style="font-size: 32px">
            Complimentary Recipes
          </h2></v-row
        >
        <v-row class="d-flex justify-space-around mt-6">
          <v-col
            v-for="complimentaryRecipe of recipe.complimentaryRecipes"
            :key="complimentaryRecipe"
            :cols="smAndDown ? 12 : mdAndDown ? 4 : 2"
            class="d-flex justify-center"
          >
            <router-link
              style="text-decoration: underline; color: #5d90b5"
              :to="`/recipe/${stringToKebabCase(complimentaryRecipe)}`"
            >
              <h1 style="font-size: 20px; font-weight: 400">
                {{ complimentaryRecipe }}
              </h1>
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
import {
  splitSentences,
  stringToKebabCase,
  splitAroundFirstPeriodOrComma,
} from "@/modules/util.js";
import { useDisplay } from "vuetify";

const route = useRoute();
const { smAndDown, mdAndDown } = useDisplay();

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

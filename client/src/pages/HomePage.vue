<template>
  <v-container class="d-flex flex-column align-center">
    <h1 style="font-size: 60px; font-weight: 800; margin: 20px 0">
      Epicure AI
    </h1>
    <v-container class="d-flex flex-column mt-8" style="max-width: 960px">
      <v-row class="mb-4">
        <v-col
          cols="12"
          md="3"
          lg="3"
          xl="3"
          class="d-flex justify-center align-center"
        >
          <!-- <h1 style="font-size: 60px; font-weight: 800; margin: 20px 0">
            how to make:
          </h1> -->
          <img src="../assets/how-to-make.png" width="250" />
        </v-col>
        <v-col v-for="recipe in howToMakeRecipes" :key="recipe.recipeId">
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

      <v-row
        class="d-flex flex-column align-center justify-center"
        style="margin-top: 70px"
      >
        <hr
          class="w-100"
          style="border: 0; height: 1px; background-color: lightgray"
        />
        <div
          style="
            background-color: #0b314b;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            margin-top: -50px;
          "
        ></div>
        <div
          class="d-flex flex-column align-center justify-center"
          style="color: white; margin-top: -155px"
        >
          <h1 style="font-size: 32px">more</h1>
          <h1 style="font-size: 32px; margin-top: -15px">recipes</h1>
          <h1 style="font-size: 32px; margin-top: -5px">&DoubleDownArrow;</h1>
        </div>
      </v-row>

      <v-row>
        <v-col
          v-for="recipe in recipes"
          :key="recipe.recipeId"
          cols="12"
          md="6"
          lg="6"
          xl="6"
          class="mb-10"
        >
          <v-row class="d-flex flex-column align-center">
            <div
              class="mb-4 py-1 px-10"
              style="background-color: #a1ccec; color: white"
            >
              <h1 style="font-size: 14px">
                {{ recipe.recent ? "RECENT POST" : "FAVORITE POST" }}
              </h1>
            </div>

            <h1 style="font-size: 24px; font-weight: 800">{{ recipe.name }}</h1>
            <h1
              style="
                font-size: 18px;
                font-weight: 400;
                text-align: center;
                margin-top: 10px;
                margin-bottom: 30px;
                max-width: 380px;
              "
            >
              {{ extractFirstSentence(recipe.description) }}
            </h1>

            <router-link
              :to="{
                name: 'recipe',
                params: {
                  recipeId: recipe.recipeId,
                },
              }"
            >
              <img :src="recipe.imageUrl" width="400" height="400" />
            </router-link>

            <hr
              class="w-75"
              style="
                border: 0;
                height: 1px;
                background-color: lightgray;
                margin-top: 30px;
              "
            />
            <hr
              class="w-75"
              style="
                border: 0;
                height: 1px;
                background-color: lightgray;
                margin-top: 5px;
              "
            />
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { extractFirstSentence } from "@/modules/util";
import { getRecentRecipes, getFavoriteRecipes } from "../modules/recipe.js";
// import { useDisplay } from "vuetify";
// const { xlAndUp } = useDisplay();

let loading = ref(false);
let howToMakeRecipes = ref([]);
let recipes = ref([]);

const loadRecipes = async () => {
  loading.value = true;

  const howToMakeRecipesResult = await getFavoriteRecipes(3);
  const recentRecipesResult = await getRecentRecipes(6);
  const favoriteRecipesResult = await getFavoriteRecipes(2);

  howToMakeRecipes.value = howToMakeRecipesResult;

  recentRecipesResult.forEach((recipe) => {
    recipes.value.push({
      ...recipe,
      recent: true,
    });
  });

  favoriteRecipesResult.forEach((recipe) => {
    recipes.value.push({
      ...recipe,
      favorite: true,
    });
  });

  loading.value = false;
};

loadRecipes();
</script>

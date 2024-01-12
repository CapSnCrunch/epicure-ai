<template>
  <v-container class="d-flex flex-column align-center">
    <h1 style="font-size: 60px; font-weight: 800; margin: 20px 0">
      Epicure AI
    </h1>
    <v-container class="d-flex flex-column mt-8" style="max-width: 960px">
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
            <div class="background-primary mb-4">RECENT POST</div>

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
import { getRecentRecipes } from "../modules/recipe.js";
// import { useDisplay } from "vuetify";
// const { xlAndUp } = useDisplay();

let loading = ref(false);
let recipes = ref([]);

const loadRecentRecipes = async () => {
  loading.value = true;

  recipes.value = await getRecentRecipes(60);

  loading.value = false;
};

loadRecentRecipes();
</script>

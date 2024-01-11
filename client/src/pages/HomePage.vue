<template>
  <v-container>
    <h1>Epicure AI</h1>
    <v-row>
      <v-col
        v-for="recipe in recipes"
        :key="recipe.recipeId"
        cols="12"
        md="6"
        lg="4"
        xl="3"
      >
        <router-link
          :to="{
            name: 'recipe',
            params: {
              recipeId: recipe.recipeId,
            },
          }"
        >
          <img :src="recipe.imageUrl" width="256" height="256" />
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { getRecentRecipes } from "../modules/recipe.js";
// import { useDisplay } from "vuetify";
// const { smAndDown, mdAndDown, xlAndUp } = useDisplay();

let loading = ref(false);
let recipes = ref([]);

const loadRecentRecipes = async () => {
  loading.value = true;

  recipes.value = await getRecentRecipes(20);

  loading.value = false;
};

loadRecentRecipes();
</script>

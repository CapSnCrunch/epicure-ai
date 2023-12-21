// Utilities
import { defineStore } from 'pinia'
import { generateRecipe } from '@/modules/recipeGeneration';

export const useRecipeStore = defineStore('recipes', {
  state: () => ({
    loading: true,
    recipes: [],
  }),
  actions: {
    async generateRecipe(search) {
      this.loading = true
      const recipe = await generateRecipe(search.value);
      this.recipes.push(recipe)
      this.loading = false
    },
  },
})

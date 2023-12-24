import { createRecipeInFirebase, getRecipeInFirebase } from '@/modules/firebase'
import { generateRecipe } from '@/modules/openai'

export const getRecipe = async (recipeId) => {
    console.log("recipeId", recipeId)
    const recipe = await getRecipeInFirebase(recipeId)
    if (recipe != null) {
        console.log('Found recipe in firestore', recipe)
        return recipe
    }

    const newRecipe = await generateRecipe(recipeId)
    createRecipeInFirebase(recipeId, newRecipe)
    console.log('Generated new recipe', newRecipe)

    return newRecipe
}
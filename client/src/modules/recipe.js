import axios from 'axios'

export const getRecipe = async (recipeId) => {

    const url = `http://localhost:3000/api/recipes/${recipeId}`
    const recipe = await axios.get(url)

    return recipe.data
}
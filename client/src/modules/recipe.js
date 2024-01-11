import axios from 'axios'

export const getRecipe = async (recipeId) => {

    const url = `http://localhost:3000/api/recipes/${recipeId}`
    const recipe = await axios.get(url)

    return recipe.data
}

export const getRecentRecipes = async (count) => {
    
    const url = `http://localhost:3000/api/recipes/recent/${count}`
    const recipes = await axios.get(url)

    return recipes.data

}
import axios from 'axios'

export const getRecipe = async (recipeId) => {

    const url = `http://localhost:3000/api/recipes/${recipeId}`

    try {
        const recipe = await axios.get(url)
        return recipe.data
    } catch(error) {
        console.error('Error fetching recipe:', error?.response?.data?.error)
        return {
            error: true,
            message: error?.response?.data?.error
        }
    }

}

export const getRecentRecipes = async (count) => {
    
    const url = `http://localhost:3000/api/recipes/recent/${count}`
    const recipes = await axios.get(url)

    return recipes.data

}


export const getFavoriteRecipes = async (count) => {
    
    const url = `http://localhost:3000/api/recipes/favorites/${count}`
    const recipes = await axios.get(url)

    return recipes.data

}
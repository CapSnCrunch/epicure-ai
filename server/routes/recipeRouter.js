const express = require('express');
const recipeRouter = express.Router();

const firebaseHelpers = require('../helpers/firebaseHelpers');
const openaiHelpers = require('../helpers/openaiHelpers');
const utils = require('../helpers/utils')

recipeRouter.get('/recipes/update-schema', async (req, res) => {
    const result = firebaseHelpers.batchUpdateFirebaseRecipes()
    if (result) {
        res.status(200).json({
            successful: 'True'
        });
    } else {
        res.status(500).json({ 
            error: 'Internal Server Error' 
        });
    }
})

recipeRouter.get('/recipes/recent/:count', async (req, res) => {
    const count = req.params.count;
    console.log("Fetching recent recipes");
  
    try {
        const recentRecipes = await firebaseHelpers.getRecentRecipesFromFirebase(count);
        res.status(200).json(recentRecipes);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Internal Server Error' 
        });
    }
});

recipeRouter.get('/recipes/favorites/:count', async (req, res) => {
    const count = req.params.count;
    console.log("Fetching favorite recipes");
  
    try {
        const favoriteRecipes = await firebaseHelpers.getFavoriteRecipesFromFirebase(count);
        res.status(200).json(favoriteRecipes);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Internal Server Error' 
        });
    }
});

recipeRouter.get('/recipes/search/:recipeId', async (req, res) => {
    const recipeId = req.params.recipeId;
    const recipeIndex = await firebaseHelpers.getMostRecentRecipeIndexStringFromFirebase()
  
    try {
        const searchRecipes = await openaiHelpers.searchRecipes(recipeId, recipeIndex);
        
        const similarRecipes = []
        for (const similarRecipeId of searchRecipes.similarRecipes) {
            let recipe = await firebaseHelpers.getRecipeFromFirebase(similarRecipeId)
            similarRecipes.push({
                ...recipe,
                recipeId: similarRecipeId
            });
        }

        const complimentaryRecipes = []
        for (const complimentaryRecipeId of searchRecipes.complimentaryRecipes) {
            let recipe = await firebaseHelpers.getRecipeFromFirebase(complimentaryRecipeId)
            complimentaryRecipes.push({
                ...recipe,
                recipeId: complimentaryRecipeId
            });
        }

        res.status(200).json({
            similarRecipes,
            complimentaryRecipes
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Internal Server Error' 
        });
    }
})

recipeRouter.get('/recipes/:recipeId', async (req, res) => {
    const recipeId = req.params.recipeId;
    console.log("Fetching recipe for ", recipeId);
    
    try {
        // Check for Recipe in Firebase
        const recipe = await firebaseHelpers.getRecipeFromFirebase(recipeId);
        if (recipe) {
            console.log('Found recipe in firestore', recipe);
            res.status(200).json(recipe);
            return;
        }
        
        // Validate Recipe
        const validation = await openaiHelpers.validateRecipe(recipeId)
        if (!validation?.reasonable) {
            console.error(validation?.reason)
            res.status(400).json({
                error: `${validation?.reason}`
            })
            return
        }

        // Generate Recipe
        const newRecipe = await openaiHelpers.generateRecipe(recipeId)
        newRecipe.createdOn = new Date(new Date().toUTCString())
        newRecipe.likes = 0
        
        // Generate Image
        const openaiImageUrl = await openaiHelpers.generateImage(recipeId)
        const firebaseImageUrl = await firebaseHelpers.uploadImageToFirebase(openaiImageUrl)
        newRecipe.imageUrl = firebaseImageUrl

        firebaseHelpers.uploadRecipeToFirebase(recipeId, newRecipe);
        firebaseHelpers.updateRecipeIndexInFirebase(recipeId);
        res.status(200).json(newRecipe);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Internal Server Error' 
        });
    }
});

module.exports = recipeRouter;
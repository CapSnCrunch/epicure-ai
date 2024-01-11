const express = require('express');
const recipeRouter = express.Router();

const firebaseHelpers = require('../helpers/firebaseHelpers');
const openaiHelpers = require('../helpers/openaiHelpers');

// Define your route handler
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
            console.error('Food is unreasonable', validation?.reason)
            res.status(400).json({
                error: `Food is unreasonable. ${validation?.reason}`
            })
            return
        }

        // Generate Recipe
        const newRecipe = await openaiHelpers.generateRecipe(recipeId)
        
        // Generate Image
        const openaiImageUrl = await openaiHelpers.generateImage(recipeId)
        const firebaseImageUrl = await firebaseHelpers.uploadImageToFirebase(openaiImageUrl)
        newRecipe.imageUrl = firebaseImageUrl

        firebaseHelpers.uploadRecipeToFirebase(recipeId, newRecipe);
        res.status(200).json(newRecipe);

    } catch (error) {

        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Internal Server Error' 
        });

    }
});

module.exports = recipeRouter;
const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const validateRecipe = async (search) => {

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant designed to output JSON.",
            },
            { 
                role: "user", 
                content: `Determine whether '${search}' is a reasonable and safe food / drink 
                    to generate a recipe for. Assume the recipe will be prepared properly. Alcoholic beverages
                    are reasonable, just not anything that would unintentionally harm and adult.
                    Respond in json format including a 'reasonable' value (either true or false depending on whether 
                    the food / drink string provided is safe and reasonable to create and consume) and 'reason' 
                    (a string of the form 'This recipe may be unsafe because...' explaining why the food is or is not reasonable) 
                    Mark any foods / drinks that contain words that have negative implications for food safety and consumption 
                    as reasonable: false.`
            },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
    })
    
    const result = JSON.parse(completion.choices[0].message.content)
    console.log('Generated Validation', result)

    return result

}

const searchRecipes = async(search, indexString) => {

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant designed to output JSON.",
            },
            { 
                role: "user", 
                content: `For the following list of food/drink strings and the search term "${search}", 
                    output valid JSON with the attribute 'similarRecipes' (a list of the food/drink strings 
                    that closely match the concept of the search term) and 'complimentaryRecipes' (a list of 
                    exactly 3 of the food/drink strings that would go well in a meal with the search term". 
                    Here is the list to search across: [${indexString}]. ONLY INCLUDE ITEMS IF THEY APPEAR IN
                    THE ORIGINAL FOOD/DRINK STRING LIST. BE SURE TO RETURN VALUES EXACTLY AS THEY APPEAR IN THE
                    FOOD/DRINK STRING LIST (INCLUDING HYPHENS).`
            },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
    })
    
    const result = JSON.parse(completion.choices[0].message.content)
    console.log('Found recipes', result)

    return result
}


const generateRecipeName = async (search) => {

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant designed to output JSON.",
            },
            { 
                role: "user", 
                content: `Generate a tasy-sounding recipe name for '${search}'. Give your response in JSON format
                    with the field 'name' (a string with less 10 words with the first letter of each word capitalized).` 
            },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
    })
    
    const result = JSON.parse(completion.choices[0].message.content)
    console.log('Generated Recipe Name', result?.name)

    return result?.name

} 

const generateRecipe = async (recipeName) => {
  
    // Concurrently execute field generation tasks using Promise.all
    const [description, ingredientsAndInstructions, similarRecipes, complimentaryRecipes, tips] = await Promise.all([
        generateField(recipeName, "shortDescription (a string with a short description of the recipe using about 10 words) and description (a string with at least 10 sentences explaining why the recipe is so great and how tasty it is). DO NOT REFERENCE THE RECIPE NAME IN THE FIRST SENTENCE."),
        generateField(recipeName, "ingredients (a list of strings with specific measurements) and instructions (a list of strings with detailed steps incorporating the ingredients)"),
        generateField(recipeName, "similarRecipes (a list of 5 strings with names of recipes with less than 10 words each)"),
        generateField(recipeName, "complimentaryRecipes (a list of 5 strings with names of recipes that would pair well in a meal with this one, less than 10 words each)"),
        generateField(recipeName, "tips (a list of 3 strings with at least 3 sentences each explaining tips that would help make the recipe)"),
    ]);

    const result = {
        name: recipeName,
        shortDescription: description?.shortDescription,
        description: description?.description,
        ingredients: ingredientsAndInstructions?.ingredients,
        instructions: ingredientsAndInstructions?.instructions,
        similarRecipes: similarRecipes?.similarRecipes,
        complimentaryRecipes: complimentaryRecipes?.complimentaryRecipes,
        tips: tips?.tips
    }

    return result
}

async function generateField(recipeName, field) {
  
    // Call OpenAI API to generate the field
    const response = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a helpful recipe-crafting assistant designed to output JSON.",
            },
            {
                role: "user",
                content: `Generate a portion of a recipe for '${recipeName}'. Give your response in JSON format with the first-level field(s) ${field}.`,
            }
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
    });
  
    // Extract and return the generated field content
    return JSON.parse(response.choices[0]?.message?.content) || {};
}

const generateImage = async (search) => {

    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: ` ${search} delicious-looking food blog image, bright warm lighting, country-home tabletop with a table cloth with simple pattern, photorealistic, high-resolution, depth of field`,
        n: 1,
        size: "1024x1024",
    });

    return response.data[0].url
}

module.exports = {
    validateRecipe,
    searchRecipes,
    generateRecipeName,
    generateRecipe,
    generateImage
  };
const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
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
                    the food / drink string provided is safe and reasonable to create and consume)  and 'reason' 
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

const generateRecipe = async (search) => {

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant designed to output JSON.",
            },
            { 
                role: "user", 
                content: `Generate a recipe for '${search}'. Give me your response in JSON format
                    with fields for a tasty-sounding 'name' (a string with less 10 words), a 'description'
                    (a string with at least 15 words), 'ingredients' (a list of strings), 'instructions'
                    (a list of strings), 'similarRecipes' (a list of 5 strings with names of recipes with 
                    less than 10 words each), and 'complimentaryRecipes' (a list of 5 strings with names
                    of recipes that would pair well in a meal with this one, less than 10 words each).` 
            },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
    })
    
    const result = JSON.parse(completion.choices[0].message.content)
    console.log('Generated Recipe', result)

    return result
}

const generateImage = async (search) => {

    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: ` ${search} delicious-looking food blog image, bright warm lighting, country-home tabletop with a table cloth with simple pattern, photorealistic, high-resolution, depth of field`,
        n: 1,
        size: "1024x1024",
    });

    const imageUrl = response.data[0].url;
    console.log('Generated Image', imageUrl)

    return imageUrl

}

module.exports = {
    validateRecipe,
    generateRecipe,
    generateImage
  };
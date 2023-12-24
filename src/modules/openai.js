import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export const generateRecipe = async (search) => {

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
    console.log(result)

    return result
}

export const generateImage = async (search) => {

    const response = await openai.images.generate({
        model: "dall-e-2",
        prompt: `a photorealistic image of a ${search} on a well-lit tabletop for a food blog`,
        n: 1,
        size: "256x256",
    });

    const imageUrl = response.data[0].url;
    console.log(imageUrl);

    return imageUrl

}
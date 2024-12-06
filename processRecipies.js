import axios from "axios";

const processRecipies = async (pantryItems, style, language) => {

    if (!pantryItems) throw new Error("Param pantryItems is mandatory!");
    if (!style) throw new Error("Param style is mandatory!");
    if (!language) throw new Error("Param language is mandatory!");

    try {
        // Call OpenAI
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4", // Use gpt-4 | gpt-3.5-turbo se preferir
                messages: [
                    {
                        role: "system",
                        content: "You are a multilingual assistant who searches the Internet for recipes that can be made using the products presented."
                    },
                    {
                        role: "user",
                        content: `Here's what I have in my pantry: “${pantryItems}”. Find “${style}” recipes on the internet. Check which of these recipes can be made with what I have in my pantry. List 2 or 3 viable recipes in my language “${language}” and show me what's missing for the ones I can almost make. The answer should be a JSON in the following format [{title, detail, missing-ingridients}]"`
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        
        // Return JSON
        const chatResponse = response.data.choices[0].message.content.trim();
        if (chatResponse) {
            console.log(`chatResponse: ${chatResponse}`);
            return chatResponse;
        }
        throw new Error("chatResponse is null.");

    } catch (error) {
        console.error(error.response?.data || error.message);
        throw Error("Error:" + error);
    }

}

export default processRecipies;
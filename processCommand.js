import axios from "axios";

const processCommand = async (commandTranscript) => {

    if (!commandTranscript) {
        throw new Error("Param commandTranscript is mandatory.");
    }

    try {
        // Call OpenAI
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo", // Use gpt-4 | gpt-3.5-turbo se preferir
                messages: [
                    {
                        role: "system",
                        content: "You are a polyglot assistant who transforms commands into standardized JSON."
                    },
                    {
                        role: "user",
                        content: `Transform the following command into a standardized JSON: “${commandTranscript}”. The JSON must have the format {command, quantity, product}. The command attribute is a one-word action and only it should be translated into English. The quantity attribute is an integer. The product attribute should not be translated and should only include the product name and ignore unit or packaging type.`
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

        // Retornar o JSON gerado
        const chatResponse = response.data.choices[0].message.content.trim();
        if (chatResponse) {
            console.log(`chatResponse: ${chatResponse}`);
            return chatResponse;
        }
        throw new Error("chatResponse is null.");

    } catch (error) {
        console.error(error.response?.data || error.message);
        throw Error("Error: " + error);
    }

}

export default processCommand;
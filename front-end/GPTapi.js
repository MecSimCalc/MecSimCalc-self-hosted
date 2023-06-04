import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
config();
export async function GptApi() {
  const configuration = new Configuration({
    organization: "org-OCQxyNplVRTgv6vXbnandxBc",
    apiKey: process.env.GPT_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "how to ask your employer for extra hours of work",
      },
    ],
  });
  console.log(response.data.choices[0].message.content);
}

import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import express from "express";
import cors from "cors";

config();

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(PORT));

app.post("/chat_input", async (req, res) => {
  let { initialValue } = req.body;

  const configuration = new Configuration({
    organization: "org-OCQxyNplVRTgv6vXbnandxBc",
    apiKey: process.env.GPT_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `${initialValue}`,
      },
    ],
  });
  res.json(completion.data.choices[0].message.content);
});

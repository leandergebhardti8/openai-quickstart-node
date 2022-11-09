import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.gamer),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
  // const response = await openai.createImage({
  //   prompt: generatePrompt(req.body.animal),
  //   n: 1,
  //   size: "1024x1024",
  // });
  // image_url = response.data.data[0].url;
  // res.status(200).json({ result: response.data.data[0].url });
}

function generatePrompt(gamer) {
  const capitalizedAnimal =
    gamer[0].toUpperCase() + gamer.slice(1).toLowerCase();
  return `Suggest three names for an GamingTag.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}

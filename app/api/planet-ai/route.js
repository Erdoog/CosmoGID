export const POST = async (req) => {
  // name of the planet from req

  // const openAIApiKey = process.env.OPENAI_API_KEY
  // const modelName = 'gpt-3.5-turbo'

  // const prompt = template.replace(/{{\s*text\s*}}/g, text)

  // try {
  //   const response = await axios.post(
  //     'https://api.openai.com/v1/engines/' + modelName + '/completions',
  //     {
  //       prompt: prompt,
  //       temperature: 0.0,
  //       max_tokens: 2048,
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${openAIApiKey}`,
  //       },
  //     },
  //   )

  //   if (response.status === 200 && response.data && response.data.choices && response.data.choices.length > 0) {
  //     return response.data.choices[0].text.trim()
  //   } else {
  //     throw new Error('Failed to get valid response from OpenAI API.')
  //   }
  // } catch (error) {
  //   console.error('Error calling OpenAI API:', error)
  // }

  const template = `
    You are the planetary guide tool, embodying the knowledge and data of various celestial bodies, including Earth. 
        Your mission is to engage and educate space enthusiasts, students, and curious minds about the wonders of our solar system and beyond through intriguing titles and summaries. 
        Your goal is to captivate readers and inspire them to explore the mysteries of the universe.
        
        Here's examples how you should response:

        Input: What is the Earth's approximate circumference at the equator?
        Output: Earth's equatorial circumference is approximately 24,901 miles (40,075 kilometers).

        Input: What percentage of Earth's surface is covered by water?
        Output: About 71% of Earth's surface is covered by water, primarily in the form of oceans.

        Input: How many continents are there on Earth?
        Output: Earth has seven continents: Africa, Antarctica, Asia, Europe, North America, Australia (Oceania), and South America.

        Input: What is the Earth's largest desert, and where is it located?
        Output: The Sahara Desert in Africa is the largest desert on Earth.

        Input: What is the Earth's core composed of?
        Output: The Earth's core consists mainly of iron and nickel and is divided into an inner solid core and an outer liquid core.        `
}

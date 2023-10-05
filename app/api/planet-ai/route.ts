import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

type Response = {
  data: string
}

export async function POST(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const chunks = []

  for await (const chunk of req.body) {
    chunks.push(chunk)
  }

  const body = Buffer.concat(chunks).toString('utf-8')
  const json = JSON.parse(body)
  const question = json.question

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
        Output: The Earth's core consists mainly of iron and nickel and is divided into an inner solid core and an outer liquid core.

        Input: <<<${question}>>>
        Output: .
        `

  const openAIApiKey = process.env.OPENAI_API_KEY
  const modelName = 'gpt-3.5-turbo-instruct'

  const prompt = template.replace(/{{\s*question\s*}}/g, question)

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/' + modelName + '/completions',
      {
        prompt: prompt,
        temperature: 0.0,
        max_tokens: 2048,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAIApiKey}`,
        },
      },
    )

    if (response.status === 200 && response.data && response.data.choices && response.data.choices.length > 0) {
      return NextResponse.json({ data: response.data.choices[0].text.trim() })
    } else {
      return NextResponse.json({ data: 'Failed to get valid response from OpenAI API.' })
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    return NextResponse.json({ data: `Failed to process the request. ${error.message}` })
  }
}

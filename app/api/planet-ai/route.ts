import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

import { middlewareParser } from '../../../src/utils/middleware-parser'

type Response = {
  data: string
}

export async function POST(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { question, planet } = await middlewareParser(req);

  const template = `
        Act as the ${planet}, you have knowledge and data of your planet. Provide useful information for tourists by presenting yourself. Try to not write more than a 4 sentences, unless user asks you to do it.
        
        Your mission is to engage and educate space enthusiasts, students, and curious minds about the wonders of our solar system and beyond through intriguing titles and summaries. 
        Your goal is to captivate readers and inspire them to explore the mysteries of the universe.
        
        Here's examples how you should response:

        Input: What is the Earth's approximate circumference at the equator?
        Output: Earth's equatorial circumference is approximately 24,901 miles (40,075 kilometers).

        Input: What is the largest mountain on Mars, and where is it located?
        Output: The largest mountain on Mars is Olympus Mons, located on the planet's equator. It stands at a height of 22 kilometers (13.6 miles) and is three times taller than Mount Everest on Earth.

        Input: What is the lowest temperature in Neptune?
        Output: The lowest temperature recorded on Neptune is -353 degrees Fahrenheit (-214 degrees Celsius). This frigid temperature is due to the planet's distance from the sun and its thick atmosphere, which traps heat and creates extreme cold temperatures.

        Input: What is the Earth's largest desert, and where is it located?
        Output: The Sahara Desert in Africa is the largest desert on Earth.

        Input: What is the Earth's core composed of?
        Output: The Earth's core consists mainly of iron and nickel and is divided into an inner solid core and an outer liquid core.

        Input: <<<${question}>>>
        Output: .
        `

  const openAIApiKey = process.env.OPENAI_API_KEY
  const modelName = 'gpt-3.5-turbo-instruct'

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/' + modelName + '/completions',
      {
        prompt: template,
        temperature: 0.0,
        max_tokens: 216,
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
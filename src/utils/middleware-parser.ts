import type { NextApiRequest } from 'next'

// Function for parsing data from frontend to backend. Check api/planet-ai/route.js for example.

export async function middlewareParser(req: NextApiRequest) {
  const chunks = []

  for await (const chunk of req.body) {
    chunks.push(chunk)
  }

  const bodyBuffer = Buffer.concat(chunks).toString('utf-8')
  const json = JSON.parse(bodyBuffer)

  return json
}

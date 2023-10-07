import axios from 'axios'
import { useState } from 'react'

export const Form = () => {
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [selectedPlanet, setSelectedPlanet] = useState<string>('')

  const handleClick = async () => {
    try {
      const response = await axios.post(  
        'api/planet-ai',
        {
          question: question,
          planet: selectedPlanet,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.data && response.data.data) {
        setAnswer(response.data.data)
      }
    } catch (err) {
      console.error(`Error fetching answer: ${err.message}`)
    }
  }

  return (
    <>
      <div className='z-20 flex flex-col gap-5'>
        <div className='flex w-full flex-row items-center justify-center gap-6'>
          <input
            type='text'
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder='Ask a planet'
            className='w-full appearance-none rounded border px-4 py-2 text-xl leading-tight text-gray-700 shadow focus:outline-none'
          />
          <button
            onClick={handleClick}
            className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
          >
            Ask
          </button>
        </div>
      </div>

      <h4 className='mt-4 rounded-xl bg-slate-800 px-6 py-4 text-xl text-blue-200'> {answer} </h4>
    </>
  )
}

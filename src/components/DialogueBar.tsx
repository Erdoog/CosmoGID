import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import axios from 'axios'

type DialogueBarProps = {
  planetName: string
  toggle: boolean
  setToggle: Dispatch<SetStateAction<boolean>>
}

const DialogueBar = ({ planetName, toggle, setToggle }: DialogueBarProps) => {
  const initialDialogue = [{ Human: '', AI: `Hello, how can I help you?` }]

  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [dialogue, setDialogue] = useState(initialDialogue)

  useEffect(() => {
    setDialogue([{ Human: question, AI: `Hello, I am ${planetName}! How can I help you?` }])
    setQuestion('')
  }, [planetName])

  const sendQuestion = async () => {
    try {
      const response = await axios.post(
        'api/planet-ai',
        {
          question: question,
          planet: planetName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.data && response.data.data) {
        setQuestion('')
        setAnswer(response.data.data)
        dialogue.push({ Human: question, AI: response.data.data })
      }
    } catch (err) {
      console.error(`Error fetching answer: ${err.message}`)
    }
  }

  return (
    <section
      className={`${
        toggle ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } flex flex-col items-center justify-between fixed w-[500px] right-0 inset-y-0 min-h-screen bg-[#374151] z-20 px-6 pt-12 pb-10 shadow-lg transition-opacity rounded-tl-3xl rounded-bl-3xl gap-6`}
    >
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold text-white capitalize'>Start Chatting with {planetName}!</h1>
      </div>

      <div className='relative flex flex-col flex-1 w-full gap-3 overflow-y-auto'>
        {dialogue.map((chunk, index) => {
          return (
            <div key={index} className='flex flex-col gap-2'>
              {chunk.Human && (
                <p className='text-lg max-w-[250px] px-4 py-2 bg-[#4A5568] rounded-r-[15px] text-white ml-auto'>
                  {chunk.Human}
                </p>
              )}
              {chunk.AI && (
                <p className='text-lg max-w-[350px] px-4 py-2 bg-[#4299E1] rounded-l-[15px] text-white mr-auto'>
                  {chunk.AI}
                </p>
              )}
            </div>
          )
        })}
      </div>

      <div className='flex w-full flex-row items-center justify-center gap-3'>
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={`Ask ${planetName}`}
          className='w-full rounded-xl border h-[70px] px-4 py-2 text-lg leading-tight text-gray-800 bg-gray-200 focus:bg-white focus:ring focus:ring-[#4299E1] focus:ring-opacity-50 resize-none'
        />
        <button
          onClick={sendQuestion}
          className='rounded-xl bg-[#48BB78] px-6 py-2 font-bold text-white hover:bg-[#38A169] focus:outline-none focus:ring focus:ring-[#4299E1] focus:ring-opacity-50'
        >
          Ask
        </button>
      </div>

      <button className='absolute top-0 left-4 text-4xl font-bold text-white' onClick={() => setToggle(false)}>
        &rarr;
      </button>
    </section>
  )
}

export default DialogueBar

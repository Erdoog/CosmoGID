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
    setDialogue([{ Human: question, AI: `Hello, how can I help you?` }])
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
      } flex flex-col items-center justify-between fixed w-[500px] right-0 inset-y-0 min-h-screen bg-[#1A202C] z-20 px-6 pt-12 pb-10 shadow-inner transition-opacity rounded-tl-xl rounded-bl-xl gap-10`}
    >
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-xl font-bold uppercase text-white'>Start chatting with {planetName}!</h1>
      </div>

      <div className='relative flex flex-col flex-1 w-full gap-3 overflow-y-auto'>
        {dialogue.map((chunk, index) => {
          return (
            <div key={index} className='flex flex-col gap-2'>
              {chunk.Human && (
                <p className='text-xl flex max-w-[250px] px-4 py-3 bg-[#2C3E50] rounded-2xl text-white ml-auto'>
                  {chunk.Human}
                </p>
              )}
              {chunk.AI && (
                <p className='text-xl max-w-[350px] px-4 py-3 bg-[#3498db] rounded-2xl text-white mr-auto'>
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
          placeholder={`Ask the ${planetName}`}
          className='w-full rounded-xl border h-[70px] px-4 py-2 text-xl leading-tight text-gray-700 overflow-y-'
        />
        <button
          onClick={sendQuestion}
          className='rounded-xl bg-green-500 px-6 py-6 font-bold text-white hover:bg-green-700'
        >
          Ask
        </button>
      </div>

      <button className='absolute top-0 left-4 text-7xl font-bold text-white' onClick={() => setToggle(false)}>
        →
      </button>
    </section>
  )
}

export default DialogueBar

'use client'

import dynamic from 'next/dynamic'
import { Form } from '../../src/components/Form'
import { useState, Suspense } from 'react'

const Mercury = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Mercury), { ssr: false })
const Venus = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Venus), { ssr: false })
// const Earth = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Uranus), { ssr: false })
const Mars = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Mars), { ssr: false })
const Jupiter = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Jupiter), { ssr: false })
const Saturn = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Saturn), { ssr: false })
const Neptune = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Neptune), { ssr: false })
const Uranus = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Uranus), { ssr: false })

const Common = dynamic(() => import('../../src/components/canvas/View').then((mod) => mod.Common), { ssr: false })

const View = dynamic(() => import('../../src/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})

export default function Page() {
  const PLANETS = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
  const [toggle, setToggle] = useState<boolean>(false)

  const DynamicPlanetComponents = PLANETS.map((planet) => {
    const PlanetComponent = dynamic(() => import(`../../src/components/canvas/Examples`).then((mod) => mod[planet]), {
      ssr: false,
    })

    return (
      <View
        className='flex h-96 w-full flex-col items-center justify-center'
        onClick={() => setToggle(!toggle)}
        key={planet}
      >
        <Suspense fallback={null}>
          <PlanetComponent scale={2} position={[0, 0, 0]} />
          <Common />
        </Suspense>
      </View>
    )
  })

  return (
    <>
      <div className='mx-auto flex min-h-full w-full flex-col flex-wrap items-center md:flex-row lg:w-4/5'>
        {/* jumbo */}
        {toggle && (
          <div className='flex max-w-6xl items-center justify-center'>
            <Form PLANETS={PLANETS} />
          </div>
        )}

        <div className='relative grid w-full grid-cols-3 text-center md:w-3/5'>{DynamicPlanetComponents}</div>
      </div>
    </>
  )
}

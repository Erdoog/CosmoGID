'use client'

import React, { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'

import { Form } from '../../src/components/Form'

const Mercury = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Mercury), { ssr: false })
const Venus = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Venus), { ssr: false })
const Earth = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Earth), { ssr: false })
const Mars = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Mars), { ssr: false })
const Jupiter = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Jupiter), { ssr: false })
// const Sun = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Jupiter), { ssr: false })
const Saturn = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Saturn), { ssr: false })
const Neptune = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Neptune), { ssr: false })
const Uranus = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Uranus), { ssr: false })
const Moon = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Moon), { ssr: false })
const Planet = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Planet), { ssr: false })
const Space = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Space), { ssr: false })

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
  // const PLANETS = ['Uranus', 'Jupiter', '', 'Venus', 'Mercury', 'Moon', '', '', 'Earth', 'Mars', 'Saturn', 'Neptune']
  const PLANETS = ['Uranus', 'Jupiter', 'Venus', 'Mercury', 'Moon', 'Earth', 'Mars', 'Saturn', 'Neptune']
  const [toggle, setToggle] = useState<boolean>(false)

  const initialPlanetPositions = {
    Moon: { x: 0, y: 0, z: 0 },
    Mercury: { x: 0, y: 0, z: 0 },
    Venus: { x: 100, y: 0, z: 0 },
    Earth: { x: 200, y: 0, z: 0 },
    Mars: { x: 100, y: 0, z: 0 },
    Jupiter: { x: 0, y: 0, z: 0 },
    Saturn: { x: 0, y: 0, z: 0 },
    Uranus: { x: 0, y: 0, z: 0 },
    Neptune: { x: 0, y: 0, z: 0 },
  }

  const [planetPositions, setPlanetPositions] = useState(initialPlanetPositions)

  useEffect(() => {
    const updateMarsPosition = () => {
      setPlanetPositions((prevPositions) => {
        const newMarsX = prevPositions.Mars.x + 1 // Update the X position of Mars (adjust the value as needed)
        const newMarsY = calculateYPosition(newMarsX) // Calculate Y position based on X (adjust this function)

        return {
          ...prevPositions,
          Mars: { x: newMarsX, y: newMarsY, z: 0 },
        }
      })
    }

    updateMarsPosition()
  }, [])

  const calculateYPosition = (x: number) => {
    // Replace this with a real calculation based on Mars' orbit
    return Math.sin(x * (Math.PI / 180)) // This is a simple sine wave for demonstration
  }

  var planetCurrentPosition = -10

  return (
    <>
      <div className='w-full h-full'>
      {/* <div className='mx-auto h-64 w-full flex-col flex-wrap items-center md:flex-row'> */}
        {/* jumbo */}
        {toggle && (
          // <div className='flex items-center justify-center'>
          <div className='flex h-40 max-w-6xl items-center justify-center'>
            <Form PLANETS={PLANETS} />
          </div>
        )}

        <div className='w-full h-full text-center' style={{backgroundColor: "#AAAAAA"}}>
          <View orbit
            className='sm:h-full sm:w-full'>

          {PLANETS.map((planet) => (
            <Suspense key={planet}>
              <Planet planetName={planet} position={[planetCurrentPosition += 2, 0, 0]}
              onClick={() => setToggle(!toggle)}
              />
              <Common/>
            </Suspense>
            // <View
            // key={planet}
            // className='flex h-96 w-96 flex-col items-center justify-center'
            // onClick={() => setToggle(!toggle)}
            // style={{
            //     transform: `translate3d(${planetPositions[planet].x}px, ${planetPositions[planet].y}px, ${planetPositions[planet].z}px)`,
            //   }}
            // >
              // <Suspense
              //   key={planet}
              //   // onClick={() => setToggle(!toggle)}
              //   fallback={null}>
              //   {planet === 'Mercury' ? <Mercury scale={0.3} position={[0, 0, 0]} /> : null}
              //   {planet === '' ? <Space scale={0} position={[0, 0, 0]} /> : null}
              //   {planet === 'Venus' ? <Venus scale={0.35} position={[0, 0, 0]} /> : null}
              //   {planet === 'Earth' ? <Earth scale={0.5} position={[0, 0, 0]} /> : null}
              //   {planet === 'Mars' ? <Mars scale={0.4} position={[0, 0, 0]} /> : null}
              //   {planet === 'Jupiter' ? <Jupiter scale={1} position={[0, 0, 0]} /> : null}
              //   {planet === 'Saturn' ? <Saturn scale={0.85} position={[0, 0, 0]} /> : null}
              //   {planet === 'Uranus' ? <Uranus scale={0.7} position={[0, 0, 0]} /> : null}
              //   {planet === 'Neptune' ? <Neptune scale={0.7} position={[0, 0, 0]} /> : null}
              //   {planet === 'Moon' ? <Moon scale={1.4} position={[0, 0, 0]} /> : null}
              //   <Common />
                
              // </Suspense>
            // </View>
          ))}
          </View>
        </div>
      </div>
    </>
  )
}

'use client'

import * as THREE from 'three'
import dynamic from 'next/dynamic'
import { Suspense, useMemo } from 'react'
import Link from 'next/link'
import { PLANETS, PLANETS_DIST } from './milky-way/page'
import { Line } from '@react-three/drei'

const Logo = dynamic(() => import('../src/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
const Uranus = dynamic(() => import('../src/components/canvas/Examples').then((mod) => mod.Uranus), { ssr: false })
const Common = dynamic(() => import('../src/components/canvas/View').then((mod) => mod.Common), { ssr: false })
const MarsLocation = dynamic(() => import('../src/components/LocationData').then((mod) => mod.MarsLocation), {ssr: false})
const Planet = dynamic(() => import('../src/components/canvas/Examples').then((mod) => mod.Planet), { ssr: false })
const View = dynamic(() => import('../src/components/canvas/View').then((mod) => mod.View), {
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
  const points = useMemo(() => new THREE.EllipseCurve(0, 0, 1, 1, 0, 2 * Math.PI, false, 0).getPoints(100), [])
  var planetAngles = {
  'Uranus': 0.6,
  'Neptune': 1.8,
  'Venus': 2.4, 
  'Mercury': 3,
  'Moon': 3.6,
  'Earth': 4.2,
  'Mars': 4.8,
  'Saturn': 5.4, 
  'Jupiter': 6,
  'Sun': 0
  }

  var planetPositions = {}
  PLANETS.forEach((val, ind) => {
        planetPositions[val] = [PLANETS_DIST[val] * Math.sin(planetAngles[val]), 0, PLANETS_DIST[val] * Math.cos(planetAngles[val])]
  })

  return (
    <>
      <div className='relative sm:h-full sm:w-full md:mb-40'>
        <View orbit className='relative sm:h-full sm:w-full'>
          <Suspense fallback={null}>
            {PLANETS.map((planetName) => (
              <>
                <Planet key={planetName} planetName={planetName}
                position={planetPositions[planetName]}
                />
                <Line key={`orbit` + planetName} worldUnits points={points}  
                scale={PLANETS_DIST[planetName]}
                rotation={[Math.acos(0), 0, 0]}
                color='#1fb2f5' lineWidth={0.07} />
              </>
            ))}
            <Common/>
          </Suspense>
        </View>
      </div>
      <Link href='/milky-way' className='m-12'>
        Choose your way
      </Link>
      {/* <MarsLocation>a</MarsLocation> */}
    </>
  )
}
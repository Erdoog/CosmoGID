'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Link from 'next/link'

const Logo = dynamic(() => import('../src/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
const Uranus = dynamic(() => import('../src/components/canvas/Examples').then((mod) => mod.Uranus), { ssr: false })
const Common = dynamic(() => import('../src/components/canvas/View').then((mod) => mod.Common), { ssr: false })
const MarsLocation = dynamic(() => import('../src/components/LocationData').then((mod) => mod.MarsLocation), {ssr: false})
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
  return (
    <>
      <div className='relative py-6 sm:h-full sm:w-full md:mb-40'>
        <View orbit className='relative sm:h-full sm:w-full'>
          <Suspense fallback={null}>
            {/* <Uranus scale={[2, 2, 2]} position={[0, 0, 0]} /> */}

            <Common/>
          </Suspense>
        </View>
      </div>
      <Link href='/milky-way' className='m-12'>
        Choose your way
      </Link>
      <MarsLocation/>
    </>
  )
}
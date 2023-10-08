'use client'

import { Suspense, useState } from 'react'
import dynamic from 'next/dynamic'

const Planet = dynamic(() => import('../../src/components/canvas/Examples').then((mod) => mod.Planet), { ssr: false })
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

const PLANETS_INFO = {
  Mercury: {
    name: 'Mercury',
    description_overview:
      "Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets. Mercury is one of four terrestrial planets in the Solar System, and is a rocky body like Earth.",
    internal_structure:
      "Mercury appears to have a solid silicate crust and mantle overlying a solid, iron sulfide outer core layer, a deeper liquid core layer, and a solid inner core. The planet's density is the second highest in the Solar System at 5.427 g/cm3 , only slightly less than Earth's density.",
    surface_geology:
      "Mercury's surface is similar in appearance to that of the Moon, showing extensive mare-like plains and heavy cratering, indicating that it has been geologically inactive for billions of years. It is more heterogeneous than either Mars's or the Moon’s.",
    touristic:
      "Mercury, the closest planet to the Sun, offers extreme temperature variations between day and night. Visitors can explore its unique terrain, including vast plains, deep craters, and rocky landscapes. Specialized suits and habitats are required due to its harsh environment.",
    rotation: '58.6',
    revolution: '87.97',
    radius: '2,439.7',
    temperature: '430',
  },
  Venus: {
    name: 'Venus',
    description_overview:
      "Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the brightest natural object in Earth's night sky after the Moon, Venus can cast shadows and can be, on rare occasions, visible to the naked eye in broad daylight.",
    internal_structure:
      'The similarity in size and density between Venus and Earth suggests they share a similar internal structure: a core, mantle, and crust. Like that of Earth, Venusian core is most likely at least partially liquid because the two planets have been cooling at about the same rate.',
    surface_geology:
      'Much of the Venusian surface appears to have been shaped by volcanic activity. Venus has several times as many volcanoes as Earth, and it has 167 large volcanoes that are over 100 km (60 mi) across. The only volcanic complex of this size on Earth is the Big Island of Hawaii.',
    rotation: '243',
    revolution: '224.7',
    radius: '6,051.8',
    temperature: '471',
  },
  Earth: {
    name: 'Earth',
    description_overview:
      "Third planet from the Sun and the only known planet to harbor life. About 29.2% of Earth's surface is land with remaining 70.8% is covered with water. Earth's distance from the Sun, physical properties and geological history have allowed life to evolve and thrive.",
    internal_structure:
      "Earth's interior, like that of the other terrestrial planets, is divided into layers by their chemical or physical (rheological) properties. The outer layer is a chemically distinct silicate solid crust, which is underlain by a highly viscous solid mantle.",
    surface_geology:
      'The total surface area of Earth is about 510 million km2. The continental crust consists of lower density material such as the igneous rocks granite and andesite. Less common is basalt, a denser volcanic rock that is the primary constituent of the ocean floors.',
    rotation: '0.99',
    revolution: '365.26',
    radius: '6,371',
    temperature: '16',
  },
  Mars: {
    name: 'Mars',
    description_overview:
      'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the "Red Planet".',
    internal_structure:
      'Like Earth, Mars has differentiated into a dense metallic core overlaid by less dense materials. Scientists initially determined that the core is at least partially liquid. Current models of its interior imply a core consisting primarily of iron and nickel with about 16–17% sulfur.',
    surface_geology:
      'Mars is a terrestrial planet whose surface consists of minerals containing silicon and oxygen, metals, and other elements that typically make up rock. The surface is primarily composed of tholeiitic basalt, although parts are more silica-rich than typical basalt.',
    rotation: '1.03',
    revolution: '1.88',
    radius: '3,389.5',
    temperature: '-28',
  },
  Jupiter: {
    name: 'Jupiter',
    description_overview:
      'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass two and a half times that of all the other planets in the Solar System combined, but less than one-thousandth the mass of the Sun.',
    internal_structure:
      "When the Juno arrived in 2016, it found that Jupiter has a very diffuse core that mixes into its mantle. A possible cause is an impact from a planet of about ten Earth masses a few million years after Jupiter's formation, which would have disrupted an originally solid Jovian core.",
    surface_geology:
      'The best known feature of Jupiter is the Great Red Spot, a persistent anticyclonic storm located 22° south of the equator. It is known to have existed since at least 1831, and possibly since 1665.',
    rotation: '9.93',
    revolution: '11.86',
    radius: '69,911',
    temperature: '-108',
  },
  Saturn: {
    name: 'Saturn',
    description_overview:
      'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth. It only has one-eighth the average density of Earth.',
    internal_structure:
      "Despite consisting mostly of hydrogen and helium, most of Saturn's mass is not in the gas phase, because hydrogen becomes a non-ideal liquid when the density is above 0.01 g/cm3, which is reached at a radius containing 99.9% of Saturn's mass.",
    surface_geology:
      "The outer atmosphere of Saturn contains 96.3% molecular hydrogen and 3.25% helium by volume. The planet's most famous feature is its prominent ring system, which is composed mostly of ice particles with a smaller amount of rocky debris and dust.",
    touristic:
      "Saturn, famous for its majestic ring system, is a visual wonder.      Tourists can visit ringed space stations or take guided tours of its icy moons like Titan and Enceladus.The outer atmosphere of Saturn contains 96.3% molecular hydrogen and 3.25% helium by volume. The planet's most famous feature is its prominent ring system, which is composed mostly of ice particles with a smaller amount of rocky debris and dust.",      
    rotation: '10.8',
    revolution: '29.46',
    radius: '58,232',
    temperature: '-138',
  },
  Uranus: {
    name: 'Uranus',
    description_overview:
      'Uranus is the seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus according to Greek mythology, was the great-grandfather of Ares. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System.',
    internal_structure:
      "The standard model of Uranus's structure is that it consists of three layers: a rocky (silicate/iron–nickel) core in the centre, an icy mantle in the middle and an outer gaseous hydrogen/helium envelope. The core is relatively small, with a mass of only 0.55 Earth masses.",
    surface_geology:
      "The composition of Uranus's atmosphere is different from its bulk, consisting mainly of molecular hydrogen and helium. The helium molar fraction, i.e. the number of helium atoms per molecule of gas, is 0.15±0.03 in the upper troposphere.",
    rotation: '17.2',
    revolution: '84',
    radius: '25,362',
    temperature: '-195',
  },
  Neptune: {
    name: 'Neptune',
    description_overview:
      'Neptune is the eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth, more massive than its near-twin Uranus.',
    internal_structure:
      "Neptune's internal structure resembles that of Uranus. Its atmosphere forms about 5% to 10% of its mass and extends perhaps 10% to 20% of the way towards the core. Increasing concentrations of methane, ammonia and water are found in the lower regions.",
    surface_geology:
      "Neptune's atmosphere is 80% hydrogen and 19% helium. A trace amount of methane is also present. Prominent absorption bands of methane exist at wavelengths above 600 nm, in the red and infrared portion of the spectrum.",
    rotation: '16.08',
    revolution: '164.79',
    radius: '24,622',
    temperature: '-201',
  },
  Sun: {
    name: 'Sun',
    description_overview:
      'The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, primarily composed of hydrogen and helium, with nuclear fusion reactions in its core that release enormous amounts of energy in the form of light and heat.',
    internal_structure:
      "The Sun's core is where nuclear fusion reactions take place, converting hydrogen into helium through a process known as nuclear fusion. The energy produced in the core travels outward through various layers, including the radiative zone and the convective zone, before reaching the Sun’s surface.",
    surface_geology:
      "The Sun's visible surface, known as the photosphere, is a turbulent and dynamic layer where intense magnetic activity leads to the formation of sunspots, solar flares, and coronal mass ejections. The Sun's surface temperature is around 5,500 degrees Celsius (9,932 degrees Fahrenheit).",
    rotation: '25',
    radius: '696,340',
    temperature: '5,500',
  },
}
export default function Page({ params }) {
  const [active, setActive] = useState<number>(1)

  return (
    <div className='flex justify-between bg-gray-900'>
      <div className={`absolute sm:h-full sm:w-full md:mb-40 z-10`}>
        <View className='relative sm:h-full sm:w-full' arcball>
          <Suspense fallback={null}>  
            <Planet position={0, 0, 0} planetName={params.planet} move={false} />
            <Common />
          </Suspense>
        </View>
      </div>

      <section className='w-full min-h-screen flex flex-col items-center justify-between max-w-3xl gap-6 px-10 py-14 bg-gray-900 text-white'>
        <ol className='flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base z-10'>
          <li
            className={`flex md:w-full items-center ${
              active === 1 && 'text-blue-600 dark:text-blue-500'
            } sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
            onClick={() => setActive(1)}
          >
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              {active === 1 && (
                <svg
                  className='w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 a9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                </svg>
              )}

              {active !== 1 && <span className='mr-2'>1</span>}
              <span className='hidden sm:inline-flex sm:ml-2'>Overview</span>
            </span>
          </li>
          <li
            className={`${
              active === 2 && 'text-blue-600 dark:text-blue-500'
            } flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
            onClick={() => setActive(2)}
          >
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              {active === 2 && (
                <svg
                  className='w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 a9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                </svg>
              )}
              {active !== 2 && <span className='mr-2'>2</span>}
              Internal <span className='hidden sm:inline-flex sm:ml-2'>Structure</span>
            </span>
          </li>
          <li
            className={`${active === 3 && 'text-blue-600 dark:text-blue-500'} flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}

            onClick={() => setActive(3)}
          >
            {active === 3 && (
              <svg
                className='w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 a9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
              </svg>
            )}
            {active !== 3 && <span className='mr-2'>3</span>}
            Geology
          </li>
          <li
            className={`${active === 4 && 'text-blue-600 dark:text-blue-500'} flex items-center`}
            onClick={() => setActive(4)}
          >
            {active === 4 && (
              <svg
                className='w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 a9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
              </svg>
            )}
            {active !== 4 && <span className='mr-2'>4</span>}
            Touristic Features
          </li>
        </ol>

        <div className='flex flex-col items-center justify-center gap-4 mb-10'>
          <h2 className='text-5xl uppercase font-bold'>{PLANETS_INFO[params.planet].name}</h2>
          <p className='text-xl text-center font-thin'>
            {active === 1
              ? PLANETS_INFO[params.planet].description_overview
              : active === 2
              ? PLANETS_INFO[params.planet].internal_structure
              : active === 3
              ? PLANETS_INFO[params.planet].surface_geology
              : PLANETS_INFO[params.planet].touristic}
          </p>
        </div>
      </section>

      <section className='w-full min-h-screen flex flex-col items-center justify-between max-w-3xl gap-6 px-10 py-14 bg-gray-900 text-white uppercase'>
        <div className='flex flex-col w-1/2 h-1/4 items-center justify-center border-[0.5px] border-white gap-3'>
          <p className={`text-sm tracking-wider`}>Rotation Time</p>
          <h5 className='text-2xl'>{PLANETS_INFO[params.planet].rotation} days</h5>
        </div>

        <div className='flex flex-col w-1/2 h-1/4 items-center justify-center border-[0.5px] border-white gap-3'>
          <p className='text-sm'>Revolution Time</p>
          <h5 className='text-2xl'>{PLANETS_INFO[params.planet].revolution} days</h5>
        </div>

        <div className='flex flex-col w-1/2 h-1/4 items-center justify-center border-[0.5px] border-white gap-3'>
          <p className='text-sm'>Radius</p>
          <h5 className='text-2xl'>{PLANETS_INFO[params.planet].radius} km</h5>
        </div>

        <div className='flex flex-col w-1/2 h-1/4 items-center justify-center border-[0.5px] border-white gap-3'>
          <p className='text-sm'>Average Temperature</p>
          <h5 className='text-2xl'>{PLANETS_INFO[params.planet].temperature}°c</h5>
        </div>
      </section>
    </div>
  )
}

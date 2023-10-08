'use client'

import { PLANETS } from "../../app/milky-way/page"

export function DistanceMeter({planetName, toggle, ...props})
{
  const planetsDistanceInfo = {
    "Mercury" : [
        "Average Distance from Earth: 91 million kilometers (56 million miles)].",
        "Travel Time (Closest Approach): 3-4 months.",
        "Travel Time (Farthest Approach): 6-7 months"],
    
    "Venus": [
        "Average Distance from Earth: 41 million kilometers (25 million miles).",
        "Travel Time (Closest Approach): 4-6 months.",
        "Travel Time (Farthest Approach): 6-8 months."
    ],
    "Mars": [
        "Average Distance from Earth: Varies between 54.6 million kilometers (33.9 million miles) and 401 million kilometers (249 million miles) due to the elliptical nature of Mars' orbit.",
        "Travel Time (Closest Approach - Hohmann Transfer Orbit): 6-9 months",
        "Travel Time (Farthest Approach): 9-12 months"
    ],

    "Moon": [
        "Average Distance from Earth: Approximately 384,400 kilometers (238,855 miles)",
        "Travel Time: Current missions take about 3-4 days using existing spacecraft technology."
    ],

    "Jupiter": ["Science is yet to find out the data about distance from earth"],
    "Saturn":  ["Science is yet to find out the data about distance from earth"],
    "Neptune": ["Science is yet to find out the data about distance from earth"],
    "Uranus":  ["Science is yet to find out the data about distance from earth"],
    "Sun": ["Science is yet to find out the data about distance from earth"],
    "Earth": ["Home :)"],
    "": []
  }

  return ( 
    <>
      <section
      className={`${
      toggle ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } flex flex-col items-center justify-between fixed w-[500px] h-[200px] left-0 bottom-0 bg-[#1A202C] z-10 px-6 pt-4 pb-10 shadow-inner transition-opacity rounded-tr-xl gap-10`}>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-xl font-bold uppercase text-white'>The length of the trip</h1>
          {planetsDistanceInfo[planetName].map((info, index) => 
              <div>{info}</div>
          )}
        </div>
      </section>
    </>
    )
}
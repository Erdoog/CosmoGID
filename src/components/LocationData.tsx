'use client'

import axios from 'axios'
import React, {useState, useEffect} from 'react';

export function MarsLocation() {
  const [locationData, setLocationData] = useState<string>('NoDataYet');

  const fetchLocation = async () =>
  {
    try {
      const response = await axios.post(  
        'api/planet-pos',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.data && response.data.data) {
        setLocationData(response.data.data)
      }
    } catch (err) {
      console.error(`Error fetching answer: ${err.message}`)
      setLocationData(`Error` + err)
    }
  }

  fetchLocation()

  return (
    <>
    <div>
        MarsLocationData: <br/>
        {locationData}
    </div>
    </>
  )
};


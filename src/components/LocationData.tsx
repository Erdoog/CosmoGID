'use client'

import axios from 'axios'
import React, {useState, useEffect} from 'react';

export function MarsLocation() {
  const [locationData, setLocationData] = useState<string>('NoDataYet');
  useEffect(() =>  {
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
        var formattedData = JSON.stringify(response.data.data).trim()
        // formattedData.replace('\\n[g]', '\\n')
        console.log(formattedData)
         
        setLocationData(formattedData)
      }
      else
      {
        setLocationData(`Empty`)
        console.error("empty")
      }
    } catch (err) {
      console.error(`Error fetching answer: ${err.message}`)
      setLocationData(`Error` + err)
    }
  }
  fetchLocation()
  })
  return (
    <>
    <div>
        MarsLocationData: <br/>
        {locationData}
    </div>
    </>
  )
};

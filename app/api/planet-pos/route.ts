import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

import { middlewareParser } from '../../../src/utils/middleware-parser'
import { useEffect, useState } from 'react'

type Response = {
  data: string
}

export async function POST(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  try {
    const response = await axios.get(
      'https://ssd.jpl.nasa.gov/api/horizons.api',
      {
        params: {
          format: 'json',
          COMMAND: '499', // Mars (major body #499)
          OBJ_DATA: 'YES',
          MAKE_EPHEM: 'YES',
          EPHEM_TYPE: 'OBSERVER',
          CENTER: '500@10', // Mars as the center
          COORD_TYPE: 'GEODETIC',
          SITE_COORD: '0,0,0', // Coordinates for observer (default: Geocentric)
          START_TIME: '2023-10-07T00:00',
          STOP_TIME: '2023-10-07T00:01',
          STEP_SIZE: '1 m', // One-minute interval
          OUT_UNITS: 'KM-D',
          REF_PLANE: 'ECLIPTIC', // Ephemeris reference plane (ECLIPTIC, FRAME, BODY EQUATOR)
          REF_SYSTEM: 'ICRF', // Reference frame (ICRF or B1950)
          TIME_DIGITS: 'MINUTES', // Time precision (MINUTES, SECONDS, FRACSEC)
          TIME_ZONE: '+00:00', // Local civil time offset relative to UT
          CAL_FORMAT: 'CAL', // Output date format (CAL, JD, BOTH)
          ANG_FORMAT: 'HMS', // RA/DEC output format (HMS, DEG)
          APPARENT: 'AIRLESS', // Refraction correction (AIRLESS, REFRACTED)
          RANGE_UNITS: 'AU', // Units for range quantities output (AU, KM)
          SUPPRESS_RANGE_RATE: 'NO', // Output of delta-dot and rdot (range-rate)
          CSV_FORMAT: 'NO', // Output format (NO, YES) - Comma-separated values
          VEC_LABELS: 'YES', // Labeling of vector components (NO, YES)
          VEC_DELTA_T: 'NO', // Output of delta-T (time-varying delta-T difference TDB-UT)
          ELM_LABELS: 'NO', // Labeling of osculating elements (NO, YES)
          TLIST: 'none', // List of discrete output times (JD, MJD, CAL)
          TLIST_TYPE: 'JD', // Type of time in TLIST (JD, MJD, CAL)
          QUANTITIES: 'A', // Desired output quantity option codes
          VEC_TABLE: '3', // Vector table format
          VEC_CORR: 'NONE', // Level of correction to output vectors (NONE, LT, LT+S)
          CAL_TYPE: 'MIXED', // Calendar input/output type (MIXED, GREGORIAN)
        },
      }
    );
    // if (response.status === 200 && response.data && response.data.choices && response.data.choices.length > 0) {
    //   return NextResponse.json({data: response.data[0].text.trim()})
    if (response.status === 200 && response.data) {
      return NextResponse.json({data: response.data})
    } else {
      console.error('Error fetching data:', response.statusText);

      // console.error('', response.data);
      return NextResponse.json({ data: 'Failed to get valid response from NASA'})
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ data: `Failed to process the request. ${error.message}` })
  }
}

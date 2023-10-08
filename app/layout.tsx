import { Layout } from '../src/components/dom/Layout'
import { League_Spartan } from 'next/font/google'
import { Antonio } from 'next/font/google'

import './global.css'

const spartan = League_Spartan({ subsets: ['latin'] })
export const antionio = Antonio({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={`${spartan.className} antialiased`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}

"use client";

import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '@/components/Navigation-Bar/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <ChakraProvider>
          <Navbar></Navbar>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}

'use client';

import { Heading } from '@chakra-ui/react';

import { useSearchParams } from 'next/navigation';

export default function ResearchPage() {
  const searchParams = useSearchParams();
  const tickerSymbol = searchParams.get('tvwidgetsymbol');
  return (
    <>
      <Heading>This is research page {tickerSymbol}</Heading>
    </>
  );
}

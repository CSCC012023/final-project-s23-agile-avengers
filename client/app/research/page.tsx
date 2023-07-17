'use client';

import { Divider, Heading } from '@chakra-ui/react';
import { CopyrightStyles, Screener } from 'react-ts-tradingview-widgets';

import TopStocks from '@/components/Research/TopStocks';

export default function ResearchPage() {
  const twStyles: CopyrightStyles = {
    parent: {
      display: 'none',
    },
  };

  return (
    <>
      <TopStocks />
      <Heading
        mb="1"
        mt="3"
        size="md"
        w="100%">
        STOCK SCREENER
      </Heading>
      <Screener
        colorTheme="light"
        copyrightStyles={twStyles}
        defaultScreen="most_capitalized"
        height={300}
        market="america"
        width="100%"></Screener>
      <Divider />
    </>
  );
}

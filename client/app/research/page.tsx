'use client';

import { Heading } from '@chakra-ui/react';
import {
  CopyrightStyles,
  MiniChart,
  Screener,
  SingleTicker,
} from 'react-ts-tradingview-widgets';

export default function ResearchPage() {
  const styles: CopyrightStyles = {
    parent: {
      display: 'none',
    },
  };
  return (
    <>
      <MiniChart
        colorTheme="dark"
        copyrightStyles={styles}
        width="100%"></MiniChart>
      <SingleTicker
        colorTheme="dark"
        copyrightStyles={styles}
        width="100%"></SingleTicker>
      <Heading
        mb="1"
        mt="3"
        size="md"
        w="100%">
        STOCK SCREENER
      </Heading>
      <Screener
        colorTheme="dark"
        defaultScreen="most_capitalized"
        height={300}
        market="america"
        width="100%"></Screener>
    </>
  );
}

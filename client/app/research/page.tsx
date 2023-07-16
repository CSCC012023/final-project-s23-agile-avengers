'use client';

import { Heading } from '@chakra-ui/react';
import { CopyrightStyles, Screener } from 'react-ts-tradingview-widgets';

export default function ResearchPage() {
  const styles: CopyrightStyles = {
    parent: {
      display: 'none',
    },
  };
  return (
    <>
      <Heading
        mb="1"
        mt="3"
        size="md"
        w="100%">
        STOCK SCREENER
      </Heading>
      <Screener
        colorTheme="light"
        copyrightStyles={styles}
        defaultScreen="most_capitalized"
        height={300}
        market="america"
        width="100%"></Screener>
    </>
  );
}

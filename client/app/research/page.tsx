'use client';

import { Heading } from '@chakra-ui/react';
import { CopyrightStyles, Screener } from 'react-ts-tradingview-widgets';

import SymbolSearch from '@/components/SymbolSearch';

import styles from '@/styles/pages/Research.module.scss';

export default function ResearchPage() {
  const tradingViewStyles: CopyrightStyles = { parent: { display: 'none' } };

  const { container, searchWrapper } = styles;

  return (
    <div className={container}>
      <Heading
        as="h1"
        size="xl">
        Research
      </Heading>
      <div className={searchWrapper}>
        <SymbolSearch callback={(symbol: string) => console.log(symbol)} />
      </div>
      <Heading
        mb="1"
        mt="3"
        size="md"
        w="100%">
        Stock Screener
      </Heading>

      <Screener
        colorTheme="light"
        copyrightStyles={tradingViewStyles}
        defaultScreen="most_capitalized"
        market="america"
        width="100%"
      />
    </div>
  );
}

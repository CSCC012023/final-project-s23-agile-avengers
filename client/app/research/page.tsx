'use client';

import { Heading } from '@chakra-ui/react';
import { CopyrightStyles, Screener } from 'react-ts-tradingview-widgets';

import styles from '@/styles/pages/Research.module.scss';

export default function ResearchPage() {
  const tradingViewStyles: CopyrightStyles = { parent: { display: 'none' } };

  const { container } = styles;

  return (
    <div className={container}>
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

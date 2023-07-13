'use client';

import {
  CopyrightStyles,
  MiniChart,
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
    </>
  );
}

'use client';

import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { CopyrightStyles } from 'react-ts-tradingview-widgets';

import SymbolSearch from '@/components/SymbolSearch';

import styles from '@/styles/pages/Research.module.scss';

export default function ResearchPage() {
  const tradingViewStyles: CopyrightStyles = { parent: { display: 'none' } };

  const { container } = styles;
  const router = useRouter();

  return (
    <div className={container}>
      <Heading
        as="h1"
        size="xl">
        Research
      </Heading>
      <SymbolSearch
        callback={(symbol: string) => {
          router.push(`/research/${symbol}`);
        }}
      />
    </div>
  );
}

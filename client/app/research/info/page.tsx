'use client';

import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import styles from '@/styles/pages/ResearchInfo.module.scss';

type ResearchInfoProps = {
  searchParams: {
    tvwidgetsymbol: string;
  };
};

export default function ResearchInfoPage({ searchParams }: ResearchInfoProps) {
  const { container } = styles;

  const router = useRouter();

  const parseSymbol = (tvwidgetsymbol: string) => {
    try {
      return !tvwidgetsymbol.includes(':')
        ? tvwidgetsymbol
        : tvwidgetsymbol.split(':')[1];
    } catch (error) {
      /**
       * User tries to access this page without passing a symbol gets
       * redirected to the Research Page
       */
      router.push('/research');
    }
  };

  const symbol = parseSymbol(searchParams.tvwidgetsymbol);

  return (
    <>
      <div className={container}>
        <Heading>{symbol}</Heading>
      </div>
    </>
  );
}

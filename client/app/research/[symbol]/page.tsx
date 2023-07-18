'use client';

import { Heading } from '@chakra-ui/react';

import styles from '@/styles/pages/MoreInfo.module.scss';

type MoreInfoProps = {
  params: {
    symbol?: string;
  };
};

export default function MoreInfoPage({ params }: MoreInfoProps) {
  const { container } = styles;

  return (
    <>
      <div className={container}>
        <Heading>{params.symbol}</Heading>
      </div>
    </>
  );
};

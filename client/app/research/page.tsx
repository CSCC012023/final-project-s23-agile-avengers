'use client';

import { Divider, Heading, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  CopyrightStyles,
  MiniChart,
  Screener,
} from 'react-ts-tradingview-widgets';

import styles from '@/styles/pages/Research.module.scss';

const StockCard = (props: any) => {
  const twStyles: CopyrightStyles = {
    parent: {
      display: 'none',
    },
  };

  const { content } = styles;

  return (
    <div className={content}>
      <MiniChart
        colorTheme="dark"
        copyrightStyles={twStyles}
        largeChartUrl={'http://localhost:3000/research/AAPL'}
        symbol={props.symbol}
        width={'auto'}></MiniChart>
    </div>
  );
};

const StockSlider = (props: any) => {
  const { wrapper } = styles;
  return (
    <>
      <div className={wrapper}>
        {props.listStocks.map((item: any, idx: any) => {
          return (
            <StockCard
              key={idx}
              symbol={item.ticker.replace('+', '')} // MiniChart does not recognize tickers with '+' - shows loading icon indefinitely
            />
          );
        })}
      </div>
    </>
  );
};

export default function ResearchPage() {
  const [top10Stocks, setTop10Stocks] = useState<any>([]);

  useEffect(() => {
    const getTops = async () => {
      try {
        const response: Response = await fetch(
          `http://localhost:4000/top10Stocks`
        );
        const jsonResponse: any = await response.json();
        const { topGainers, topLosers, mostActivelyTraded } = jsonResponse;
        console.log('json response is:', jsonResponse);
        setTop10Stocks(topLosers);
      } catch (e: any) {
        console.error(e);
      }
    };

    getTops();
  }, []);

  const twStyles: CopyrightStyles = {
    parent: {
      display: 'none',
    },
  };

  const { container } = styles;

  return (
    <>
      <Heading fontSize={'xl'}>Top 10 Stocks</Heading>

      <div className={container}>
        {top10Stocks && Array.isArray(top10Stocks) ? (
          <StockSlider listStocks={top10Stocks} />
        ) : (
          <Spinner size={'md'} />
        )}
      </div>

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

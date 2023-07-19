import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CopyrightStyles, MiniChart } from 'react-ts-tradingview-widgets';

import { ChevronDownIcon } from '@chakra-ui/icons';

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
        largeChartUrl={`http://localhost:3000/research/${props.symbol}`}
        symbol={props.symbol}
        width={'auto'}></MiniChart>
    </div>
  );
};

const StockSlider = ({ listStocks }: any) => {
  const { wrapper } = styles;
  return (
    <>
      <div className={wrapper}>
        {listStocks.map((item: any, idx: any) => {
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

export default function TopStocks() {
  const [top10Stocks, setTop10Stocks] = useState<any>([]);
  const [leaderBoard, setLeaderBoard] = useState<string>('Top Gainers');
  const [fullResponse, setFullResponse] = useState<any>([]);

  useEffect(() => {
    const getTops = async () => {
      try {
        const response: Response = await fetch(
          `http://localhost:4000/top10Stocks`,
        );
        const jsonResponse: any = await response.json();
        const { topGainers } = jsonResponse;
        setFullResponse(jsonResponse);
        setTop10Stocks(topGainers);
      } catch (e: any) {
        console.error(e);
      }
    };

    getTops();
  }, []);

  const { container } = styles;

  return (
    <>
      <Menu>
        <Flex
          alignItems="center"
          gap="2"
          marginBottom={'20px'}
          marginTop={'10px'}
          minWidth="max-content"
          paddingX={'20px'}>
          <Box>
            <Heading size="md">Top 10 Stocks</Heading>
          </Box>
          <Spacer />
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}>
            {leaderBoard}
          </MenuButton>
        </Flex>
        <MenuList>
          <MenuItem
            onClick={() => {
              setTop10Stocks(fullResponse.topGainers);
              setLeaderBoard('Top Gainers');
            }}>
            Top Gainers
          </MenuItem>
          <MenuItem
            onClick={() => {
              setTop10Stocks(fullResponse.topLosers);
              setLeaderBoard('Top Losers');
            }}>
            Top Losers
          </MenuItem>
          <MenuItem
            onClick={() => {
              setTop10Stocks(fullResponse.mostActivelyTraded);
              setLeaderBoard('Most Actively Traded');
            }}>
            Most Actively Traded
          </MenuItem>
        </MenuList>
      </Menu>

      <div className={container}>
        {top10Stocks && Array.isArray(top10Stocks) ? (
          <StockSlider listStocks={top10Stocks} />
        ) : (
          <Spinner size={'md'} />
        )}
      </div>
    </>
  );
}

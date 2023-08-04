'use client';

import SymbolSearch from '@/components/SymbolSearch';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Link,
  Select,
  Spinner,
  Text
} from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { CopyrightStyles, MiniChart } from 'react-ts-tradingview-widgets';

import useWindowWidth from '@/hooks/useWindowWidth';
import { ErrorResponse } from '@/types/base';

import styles from '@/styles/pages/Trading.module.scss';

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const tradingViewStyles: CopyrightStyles = { parent: { display: 'none' } };

type AccountInfo = {
  cash: number;
  value: number;
};

export default function TradingPage() {
  const [symbol, setSymbol] = useState('');

  const {
    center,
    container,
    accountInfo,
    info,
    valueName,
    valueText,
    searchWrapper,
    tradeWrapper,
    symbolInfo,
    tradeContainer,
    optionsWrapper,
    orderWrapper,
    amountsWrapper,
    amountContainer,
    showMax,
    buttonWrapper,
  } = styles;

  const { userId } = useAuth();
  const windowWidth = useWindowWidth();

  const [accInfo, setAccInfo] = useState<AccountInfo>();

  const getAccountInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/trading/accountInfo?userID=${userId}`,
      );

      if (response.ok) {
        const data: AccountInfo = await response.json();
        setAccInfo(data);
      } else {
        const error: ErrorResponse = await response.json();
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAccountInfo();
  }, []);

  if (!accInfo)
    return (
      <div className={center}>
        <Spinner
          color="blue.500"
          emptyColor="gray.200"
          size="xl"
          speed="0.65s"
          thickness="4px"
        />
        <Text>Loading Trading Account</Text>
      </div>
    );

  return (
    <div className={container}>
      <HStack>
        <Heading
          as="h1"
          size="xl">
          Trading
        </Heading>
        <Link as="a" href="/trading/trade-history" ml='5'>
          <Button>Your trade history</Button>
        </Link>
      </HStack>

      <div className={searchWrapper}>
        <SymbolSearch callback={(symbol: string) => setSymbol(symbol)} />
        <div className={accountInfo}>
          <Text className={`${info} ${valueName}`}> Account Value </Text>
          <Text className={`${info} ${valueName}`}>Cash</Text>
          <Text className={`${info} ${valueText}`}>
            {USDollar.format(accInfo.value)}
          </Text>
          <Text className={`${info} ${valueText}`}>
            {USDollar.format(accInfo.cash)}
          </Text>
        </div>
      </div>
      <div className={tradeWrapper}>
        <div className={symbolInfo}>
          {symbol && (
            <MiniChart
              autosize={windowWidth <= 790}
              colorTheme="light"
              copyrightStyles={tradingViewStyles}
              dateRange="1M"
              height="270"
              largeChartUrl={`http://localhost:3000/research/info`}
              symbol={symbol}
              width="560"
            />
          )}
        </div>
        <div className={tradeContainer}>
          <div className={optionsWrapper}>
            <FormControl className={orderWrapper}>
              <FormLabel>Order Type</FormLabel>
              <Select
                placeholder="Select"
                width="100%">
                <option>Market</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Action</FormLabel>
              <Select
                placeholder="Select"
                width="100%">
                <option>Buy</option>
                <option>Sell</option>
              </Select>
            </FormControl>
          </div>

          <div className={amountsWrapper}>
            <FormControl
              className={amountContainer}
              mr="10%">
              <FormLabel>Amount</FormLabel>
              <Input
                min={0}
                type="number"
              />
            </FormControl>

            <Button
              className={showMax}
              colorScheme="gray"
              maxWidth="30%">
              Show Max
            </Button>
          </div>

          <ButtonGroup
            className={buttonWrapper}
            spacing="25">
            <Button
              colorScheme="red"
              size="lg">
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              size="lg">
              Preview Order
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}

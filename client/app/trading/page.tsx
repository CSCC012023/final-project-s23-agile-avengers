'use client';

import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { CopyrightStyles, MiniChart } from 'react-ts-tradingview-widgets';

import SymbolSearch from '@/components/SymbolSearch';
import useWindowWidth from '@/hooks/useWindowWidth';

import styles from '@/styles/pages/Trading.module.scss';

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const tradingViewStyles: CopyrightStyles = { parent: { display: 'none' } };

export default function TradingPage() {
  const [symbol, setSymbol] = useState('');

  const {
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

  const cash = 100000;
  const value = 100192.58;

  const windowWidth = useWindowWidth();

  return (
    <div className={container}>
      <Heading
        as="h1"
        size="xl">
        Trading
      </Heading>
      <div className={searchWrapper}>
        <SymbolSearch callback={(symbol: string) => setSymbol(symbol)} />
        <div className={accountInfo}>
          <Text className={`${info} ${valueName}`}> Account Value </Text>
          <Text className={`${info} ${valueName}`}>Cash</Text>
          <Text className={`${info} ${valueText}`}>
            {USDollar.format(value)}
          </Text>
          <Text className={`${info} ${valueText}`}>
            {USDollar.format(cash)}
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

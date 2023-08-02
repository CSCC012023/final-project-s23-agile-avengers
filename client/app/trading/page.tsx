'use client';

import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';

import SymbolSearch from '@/components/SymbolSearch';

import styles from '@/styles/pages/Trading.module.scss';

export default function TradingPage() {
  const [symbol, setSymbol] = useState('');

  const {
    container,
    tradeWrapper,
    searchWrapper,
    optionsWrapper,
    orderWrapper,
    amountsWrapper,
    amountContainer,
    showMax,
    buttonWrapper,
  } = styles;

  return (
    <div className={container}>
      <Heading
        as="h1"
        size="xl">
        Trading
      </Heading>
      <div className={searchWrapper}>
        <SymbolSearch callback={(symbol: string) => setSymbol(symbol)} />
      </div>
      <div className={tradeWrapper}>
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
  );
}

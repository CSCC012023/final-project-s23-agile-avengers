'use client';

import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { CopyrightStyles, MiniChart } from 'react-ts-tradingview-widgets';

import SymbolSearch from '@/components/SymbolSearch';
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

type SymbolPrice = {
  symbol: string;
  price: string;
};

export default function TradingPage() {
  const { userId } = useAuth();

  // Used for Preview Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [accInfo, setAccInfo] = useState<AccountInfo>();
  const [action, setAction] = useState<string>('buy');
  const [amount, setAmount] = useState<number>();
  const [symbol, setSymbol] = useState<string>();
  const [price, setPrice] = useState<number>();

  const windowWidth = useWindowWidth();

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

  const getPrice = async () => {
    try {
      const response: Response = await fetch(
        `http://localhost:4000/trading/symbolPrice?symbol=${symbol}`,
      );
      if (response.ok) {
        const data: SymbolPrice = await response.json();
        setPrice(parseFloat(data.price));
      } else {
        const error: ErrorResponse = await response.json();
        console.error(error);
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    getAccountInfo();
  }, []);

  useEffect(() => {
    getPrice();
  }, [symbol !== undefined]);

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

  const getMaxAmount = () => {
    return Math.floor(accInfo.cash / (price as number));
  };

  return (
    <div className={container}>
      <Heading
        as="h1"
        size="xl">
        Trading
      </Heading>
      <div className={searchWrapper}>
        <SymbolSearch
          callback={(symbol: string) => {
            setSymbol(symbol);
          }}
        />
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
                placeholder="Market"
                width="100%"></Select>
            </FormControl>

            <FormControl>
              <FormLabel>Action</FormLabel>
              <Select
                onChange={(e) => setAction(e.target.value)}
                value={action}
                width={'100%'}>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </Select>
            </FormControl>
          </div>
          <div className={amountsWrapper}>
            <FormControl
              className={amountContainer}
              mr={'10%'}>
              <FormLabel>Amount</FormLabel>
              <NumberInput
                defaultValue={0}
                max={!price ? Number.MAX_SAFE_INTEGER : getMaxAmount()}
                min={0}
                onChange={(_, value) => setAmount(value)}
                value={amount}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <Button
              className={showMax}
              colorScheme="gray"
              isDisabled={!symbol || !price}
              maxWidth="30%"
              onClick={() => setAmount(getMaxAmount())}>
              Show Max
            </Button>
          </div>

          <ButtonGroup
            className={buttonWrapper}
            spacing="25">
            <Button
              colorScheme="red"
              onClick={() => {
                setAction('buy');
                setAmount(undefined);
                setSymbol(undefined);
                setPrice(undefined);
              }}
              size={'lg'}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              isDisabled={!symbol || amount === 0 || !price}
              onClick={() => {
                onOpen();
              }}
              size={'lg'}>
              Preview Order
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Preview Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table>
                <Tbody>
                  <Tr>
                    <Td>
                      <b>
                        {`${symbol} : ${
                          action.charAt(0).toUpperCase() + action.slice(1)
                        } at Market`}
                      </b>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Price</Td>
                    <Td>{USDollar.format(price as number)}</Td>
                  </Tr>
                  <Tr>
                    <Td>Amount</Td>
                    <Td>{amount}</Td>
                  </Tr>
                  <Tr>
                    <Td>Estimated Total</Td>
                    <Td>
                      {USDollar.format((amount as number) * (price as number))}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onClose}
              variant="ghost">
              Change Order
            </Button>
            <Button
              colorScheme="blue"
              mr={3}>
              Submit Order
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

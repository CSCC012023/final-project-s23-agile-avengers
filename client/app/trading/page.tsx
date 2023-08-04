'use client';

import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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

export default function TradingPage() {
  const { userId } = useAuth();
  const { isOpen: isSearchOpen, onClose } = useDisclosure();
  const {
    isOpen: isPreviewOpen,
    onOpen: onPreviewOpen,
    onClose: onPreviewClose,
  } = useDisclosure();
  const [action, setAction] = useState('Buy');
  const [amount, setAmount] = useState('');
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(0);
  const [maxAmount, setMaxAmount] = useState<number | null>(0);

  const getPrice = async () => {
    if (!userId) return;
    try {
      const response: Response = await fetch(
        `http://localhost:4000/trading/symbolPrice?symbol=${symbol}`,
      );
      if (!response.ok) throw new Error('Response not ok');
      const data = await response.json();
      const price: number = parseFloat(data.price);
      setPrice(price);
      return price;
    } catch (e: any) {
      console.error(e);
    }
  };

  const calculateMaxAmount = () => {
    if (action === 'Buy' && price) setMaxAmount(Math.floor(100000 / price));
    //else if (selectedAction === 'Sell') setMaxAmount(floor(await getShares()));
    else setMaxAmount(null);
  };

  const handleActionChange = (e: any) => {
    setAction(e.target.value);
  };

  const handleMaxClick = async () => {
    const price = await getPrice();
    if (price) {
      setPrice(price);
      calculateMaxAmount();
    }
  };

  const handlePreviewClick = async () => {
    const price = await getPrice();
    if (price) setPrice(price);
  };

  const handleAmountChange = (e: any) => {
    setAmount(e.target.value);
  };

  const handleModalClose = () => {
    setMaxAmount(0);
  };

  const isSymbolError = symbol === '';
  const isAmountError = amount === '';
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
            {USDollar.format(accInfo.value)}
          </Text>
          <Text className={`${info} ${valueText}`}>
            {USDollar.format(accInfo.cash)}
          </Text>
          {!isSymbolError ? (
            <FormHelperText></FormHelperText>
          ) : (
            <FormErrorMessage>Symbol is required.</FormErrorMessage>
          )}
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

            <FormControl isDisabled={symbol === ''}>
              <FormLabel>Action</FormLabel>
              <Select
                onChange={handleActionChange}
                placeholder="Buy"
                width={'100%'}>
                <option>Sell</option>
              </Select>
            </FormControl>
          </div>
          <div className={amountsWrapper}>
            <FormControl
              className={amountContainer}
              isDisabled={symbol === ''}
              isInvalid={isAmountError}
              mr={'10%'}>
              <FormLabel>Amount</FormLabel>
              <Input
                min={0}
                onChange={handleAmountChange}
                placeholder={maxAmount ? maxAmount.toString() : '0'}
                type="number"
                value={amount}
              />
              {!isAmountError ? (
                <FormHelperText></FormHelperText>
              ) : (
                <FormErrorMessage>Enter valid amount.</FormErrorMessage>
              )}
            </FormControl>

            <Button
              className={showMax}
              colorScheme="gray"
              isDisabled={symbol === ''}
              maxWidth="30%"
              onClick={handleMaxClick}>
              Show max
            </Button>
          </div>

          <ButtonGroup
            className={buttonWrapper}
            spacing="25">
            <Button
              colorScheme="red"
              isDisabled={symbol === ''}
              size={'lg'}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              isDisabled={symbol === '' || amount === ''}
              onClick={() => {
                onPreviewOpen();
                handlePreviewClick();
              }}
              size={'lg'}>
              Preview Order
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <Modal
        isOpen={isSearchOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody
            height={800}
            pl={-10}
            pt={-2}>
            <SymbolSearch
              callback={(symbol: string) => {
                setSymbol(symbol);
                onClose();
                handleModalClose();
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isPreviewOpen}
        onClose={onPreviewClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Preview Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table>
                <Tbody>
                  <Tr>
                    <Td as="b">
                      {symbol}: {action} at Market
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Duration</Td>
                    <Td>Day Only</Td>
                  </Tr>
                  <Tr>
                    <Td>Price</Td>
                    <Td>${price}</Td>
                  </Tr>
                  <Tr>
                    <Td>Amount</Td>
                    <Td>{amount}</Td>
                  </Tr>
                  <Tr>
                    <Td>Estimated Total</Td>
                    <Td>${(parseFloat(amount) * price).toFixed(2)}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onPreviewClose}
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

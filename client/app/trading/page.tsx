'use client';

import { SearchIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

import SymbolSearch from '@/components/SymbolSearch';
import { useAuth } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';

export default function TradingPage() {
  const { userId } = useAuth();
  const { isOpen: isSearchOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isPreviewOpen,
    onOpen: onPreviewOpen,
    onClose: onPreviewClose,
  } = useDisclosure();
  const [action, setAction] = useState('Buy');
  const [amount, setAmount] = useState('');
  const [symbol, setSymbol] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('Buy');
  const [price, setPrice] = useState<number | null>(null);
  const [maxAmount, setMaxAmount] = useState<number | null>(0);

  const getPrice = async () => {
    if (!userId) return;
    try {
      const response: Response = await fetch(
        `http://localhost:4000/latestPrice?symbol=${symbol}`,
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
    if (selectedAction === 'Buy' && price)
      setMaxAmount(Math.floor(100000 / price));
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
      setTimeout(calculateMaxAmount, 500);
    }
  };

  const handleAmountChange = (e: any) => {
    setAmount(e.target.value);
  };

  const isSymbolError = symbol === '';
  const isAmountError = amount === '';
  return (
    <Box p={10}>
      <Text
        fontSize={'5xl'}
        fontWeight={'bold'}
        mb={10}
        ml={10}>
        Trading
      </Text>
      <Box
        maxWidth="800px"
        mx="auto">
        <FormControl isInvalid={isSymbolError}>
          <FormLabel>Search</FormLabel>
          <InputGroup width={'70%'}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.900" />
            </InputLeftElement>
            <Input
              isReadOnly
              onClick={onOpen}
              placeholder="Search for symbol"
              value={symbol}
            />
          </InputGroup>
          {!isSymbolError ? (
            <FormHelperText></FormHelperText>
          ) : (
            <FormErrorMessage>Symbol is required.</FormErrorMessage>
          )}
        </FormControl>

        <Flex justifyContent={'flex-start'}>
          <FormControl
            isDisabled={symbol === ''}
            mr={'10%'}
            mt={4}
            width={'30%'}>
            <FormLabel>Action</FormLabel>
            <Select
              onChange={handleActionChange}
              placeholder="Buy"
              width={'100%'}>
              <option>Sell</option>
            </Select>
          </FormControl>

          <Flex
            justifyContent={'flex-start'}
            width={'30%'}>
            <FormControl
              isDisabled={symbol === ''}
              isInvalid={isAmountError}
              mr={'10%'}
              mt={4}
              width={'50%'}>
              <FormLabel>Amount</FormLabel>
              <Input
              onChange={handleAmountChange}
                placeholder={maxAmount ? maxAmount.toString() : '0'}
                type="number"
                value={amount}
                width={'100%'}
              />
              {!isAmountError ? (
                <FormHelperText></FormHelperText>
              ) : (
                <FormErrorMessage>Enter valid amount.</FormErrorMessage>
              )}
            </FormControl>

            <Button
              alignSelf={'flex-end'}
              colorScheme="gray"
              isDisabled={symbol === ''}
              isDisabled={symbol === ''}
              minWidth="100px"
              mt={4}
              onClick={handleMaxClick}
              onClick={handleMaxClick}
              p={5}>
              <ViewIcon mr={2}></ViewIcon>Show max
            </Button>
          </Flex>
        </Flex>

        <Flex justifyContent={'start'}>
          <FormControl
            isDisabled={symbol === ''}
            mr={'10%'}
            mt={4}
            width={'30%'}>
            <FormLabel>Order Type</FormLabel>
            <Select
              placeholder="Market"
              width={'100%'}>
            </Select>
          </FormControl>

          <FormControl
            isDisabled={symbol === ''}
            mt={4}
            width={'30%'}>
            <FormLabel>Duration</FormLabel>
            <Select
              placeholder="Day Only"
              width={'100%'}>
            </Select>
          </FormControl>
        </Flex>

        <ButtonGroup
          borderRadius={15}
          mt={30}
          spacing="25"
          variant="outline"
          w={'100%'}>
          <Button
            colorScheme="red"
            isDisabled={symbol === ''}
            onClick={() => {
              alert('unimplemented, probably reset all values');
            }}
            size={'lg'}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            isDisabled={symbol === '' || amount === ''}
            onClick={onPreviewOpen}
            size={'lg'}>
            Preview Order
          </Button>
        </ButtonGroup>
      </Box>

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
                    <Td>Amount</Td>
                    <Td>{amount}</Td>
                  </Tr>
                  <Tr>
                    <Td>Estimated Total</Td>
                    <Td>{parseFloat(amount) * 100}</Td>
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
    </Box>
  );
}

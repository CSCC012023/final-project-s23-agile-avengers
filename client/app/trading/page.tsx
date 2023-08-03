'use client';

import { SearchIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

import SymbolSearch from '@/components/SymbolSearch';
import { useAuth } from '@clerk/nextjs';

export default function TradingPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userId } = useAuth();
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
    setSelectedAction(e.target.value);
  };

  const handleMaxClick = () => {
    getPrice();
    calculateMaxAmount();
  };

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
        <FormControl>
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
        </FormControl>

        <Flex justifyContent={'flex-start'}>
          <FormControl
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
              mr={'10%'}
              mt={4}
              width={'50%'}>
              <FormLabel>Amount</FormLabel>
              <Input
                placeholder={maxAmount ? maxAmount.toString() : '0'}
                type="number"
                width={'100%'}
              />
            </FormControl>

            <Button
              alignSelf={'flex-end'}
              colorScheme="gray"
              //isDisabled={!action}
              minWidth="100px"
              mt={4}
              onClick={handleMaxClick}
              p={5}>
              <ViewIcon mr={2}></ViewIcon>Show max
            </Button>
          </Flex>
        </Flex>

        <Flex justifyContent={'start'}>
          <FormControl
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
            onClick={() => {
              alert('unimplemented, probably reset all values');
            }}
            size={'lg'}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              alert('unimplemented!');
            }}
            size={'lg'}>
            Preview Order
          </Button>
        </ButtonGroup>
      </Box>

      <Modal
        isOpen={isOpen}
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
    </Box>
  );
}

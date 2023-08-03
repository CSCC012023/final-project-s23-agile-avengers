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

export default function TradingPage() {
  const { isOpen: isSearchOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isPreviewOpen,
    onOpen: onPreviewOpen,
    onClose: onPreviewClose,
  } = useDisclosure();
  const [action, setAction] = useState('Buy');
  const [amount, setAmount] = useState('');
  const [symbol, setSymbol] = useState('');

  const handleAmountChange = (e: any) => {
    setAmount(e.target.value);
  };

  const handleActionChange = (e: any) => {
    setAction(e.target.value);
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
              value={action}
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
                onChange={handleAmountChange}
                placeholder="0"
                type="number"
                value={amount}
                width={'100%'}
              />
            </FormControl>

            <Button
              alignSelf={'flex-end'}
              colorScheme="gray"
              minWidth="100px"
              mt={4}
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
              width={'100%'}></Select>
          </FormControl>

          <FormControl
            mt={4}
            width={'30%'}>
            <FormLabel>Duration</FormLabel>
            <Select
              placeholder="Day Only"
              width={'100%'}></Select>
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

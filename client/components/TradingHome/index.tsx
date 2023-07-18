'use client';

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
    Select,
    Text
} from "@chakra-ui/react";


import { SearchIcon, ViewIcon } from '@chakra-ui/icons';

const TradingHome = () => {
  return (
      <Box p={10}>
        <Text fontWeight={'bold'} fontSize={'5xl'} mb={10} ml={10}>Trading</Text>
        <Box maxWidth="800px" mx="auto">
        <FormControl>
        <FormLabel>Search</FormLabel>
        <InputGroup width={'70%'}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.900" />
              </InputLeftElement>
              <Input
                placeholder="Search for symbol"
              />
        </InputGroup>
        </FormControl>
        
        <Flex justifyContent={"flex-start"}>
        <FormControl mt={4} width={'30%'} mr={'10%'}>
        <FormLabel>Action</FormLabel>
        <Select placeholder="Select" width={'100%'}>
          <option>Buy</option>
          <option>Sell</option>
          <option>Edit this</option>
        </Select>
        </FormControl>
        
        <Flex justifyContent={'flex-start'} width={'30%'}>
        <FormControl mt={4} width={'50%'} mr={'10%'}>
        <FormLabel>Amount</FormLabel>
        <Input type="number" placeholder="0" width={'100%'}/>
        </FormControl>

        <Button alignSelf={'flex-end'} mt={4} p={5} colorScheme="gray" minWidth="100px"><ViewIcon mr={2}></ViewIcon>Show max</Button>
        </Flex>
        </Flex>

        <Flex justifyContent={"start"}>
        <FormControl mt={4} width={'30%'} mr={'10%'}>
        <FormLabel>Order Type</FormLabel>
        <Select placeholder="Select" width={'100%'}>
          <option>Market</option>
          <option>Edit this</option>
          <option>Edit this</option>
        </Select>
        </FormControl>
        
        <FormControl mt={4} width={'30%'}>
        <FormLabel>Duration</FormLabel>
        <Select placeholder="Select" width={'100%'}>
          <option>Day Only</option>
          <option>Night Only</option>
          <option>Edit this</option>
        </Select>
        </FormControl>
        </Flex>

        <ButtonGroup variant='outline' w={'100%'} spacing='25' borderRadius={15} mt={30}>
        <Button colorScheme='red' size={'lg'}>Cancel</Button>
        <Button colorScheme='blue' size={'lg'}>Preview Order</Button>
        </ButtonGroup>
        </Box>
      </Box>
  );
};

export default TradingHome;

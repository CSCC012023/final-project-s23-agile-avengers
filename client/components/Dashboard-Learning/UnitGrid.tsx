'use client';

import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
  CardFooter,
  Button,
} from '@chakra-ui/react';
import UnitCard from './UnitCard';

const Units = [
  {
    name: "Blue chips Stocks",
    content: [{
      name: "Learn to invest"
    }]
  }
]
const UnitGrid = () => {
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      m={3}>
      <UnitCard props={Units[0]} />
      <UnitCard />
      <UnitCard />
    </SimpleGrid>
  );
};

export default UnitGrid;

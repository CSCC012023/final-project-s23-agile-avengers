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
    name: 'Blue chips Stocks',
    content: [
      {
        name: 'Learn to invest',
      },
    ],
  },
];
const UnitGrid = () => {
  return (
    <SimpleGrid
      spacing={4}
      columns={{ sm: 2, md: 3 }}
      m={3}>
      <UnitCard
        name={Units[0].name}
        content={Units[0].content}
      />
      <UnitCard
        name={Units[0].name}
        content={Units[0].content}
      />
      <UnitCard
        name={Units[0].name}
        content={Units[0].content}
      />
    </SimpleGrid>
  );
};

export default UnitGrid;

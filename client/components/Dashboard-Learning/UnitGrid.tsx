'use client';

import { Unit } from '@/types/components/Dashboard-Learning/types';
import { SimpleGrid } from '@chakra-ui/react';
import UnitCard from './UnitCard';

type UnitGridParams = {
  units: Unit[];
  courseSlug: string;
};
const UnitGrid = ({ units, courseSlug }: UnitGridParams) => {
  return (
    <SimpleGrid
      boxShadow="m"
      columns={{ sm: 1, md: 2, lg: 3 }}
      m={3}
      spacing={4}>
      {units.map((unit) => (
        <UnitCard
          courseSlug={courseSlug}
          key={unit.slug}
          unit={unit}
        />
      ))}
    </SimpleGrid>
  );
};

export default UnitGrid;

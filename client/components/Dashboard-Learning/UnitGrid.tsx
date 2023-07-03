'use client';

import { SimpleGrid } from '@chakra-ui/react';
import { Unit } from '@/types/components/Dashboard-Learning/types';
import UnitCard from './UnitCard';
import { UnitWithProgress } from '@/types/learning';

type UnitGridParams = {
  units: Unit[];
  courseSlug: String;
  userUnits: UnitWithProgress[];
};
const UnitGrid = ({ units, courseSlug, userUnits }: UnitGridParams) => {
  const findUnitProgress = (
    completedUnits: UnitWithProgress[],
    unitSlug: String
  ): number => {
    for (const unitWithProgress of completedUnits) {
      if (unitWithProgress.unit.slug === unitSlug) {
        return unitWithProgress.progress.valueOf();
      }
    }
    return 0;
  };
  return (
    <SimpleGrid
      spacing={4}
      columns={{ sm: 1, md: 2, lg: 3 }}
      m={3}
      boxShadow="m">
      {units.map((unit) => (
        <UnitCard
          key={unit.slug}
          unit={unit}
          total={unit.contents.length}
          completed={findUnitProgress(userUnits, unit.slug)}
          courseSlug={courseSlug}
        />
      ))}
    </SimpleGrid>
  );
};

export default UnitGrid;

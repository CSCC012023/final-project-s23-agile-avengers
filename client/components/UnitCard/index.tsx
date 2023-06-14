'use client';

import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import { Heading, Text } from '@chakra-ui/react';

import { UnitProps } from '@/types/learning';

import styles from '@/styles/components/UnitCard.module.scss';

const UnitCard = ({ title, contents }: UnitProps) => {
  const { unitHeader, contentWrapper } = styles;

  return (
    <Card variant="elevated">
      <CardHeader
        bg="brand.black"
        color="brand.white"
        borderTopRadius="md"
        className={unitHeader}>
        <Heading size="md"> {title}</Heading>
      </CardHeader>
      <CardBody
        bg="brand.gray"
        borderBottomRadius="md"
        className={contentWrapper}>
        {contents.map((content, contentKey) => {
          return (
            <Text
              key={contentKey}
              size="sm">
              {content}
            </Text>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default UnitCard;

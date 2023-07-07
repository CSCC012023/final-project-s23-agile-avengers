import { Heading, Progress, Text } from '@chakra-ui/react';

type UnitListItemProps = {
  name: string;
  doneValue: number;
  totalValue: number;
};

const UnitListItem = ({ name, doneValue, totalValue }: UnitListItemProps) => {
  return (
    <Heading
      size="lg"
      textTransform="capitalize"
      w="100%">
      {name}
      <Progress
        className={'progressBar'}
        hasStripe
        mt={3}
        size="md"
        value={(doneValue / totalValue) * 100}
      />
      <Text
        fontSize="lg"
        mt={3}>
        {doneValue}/{totalValue} points
      </Text>
    </Heading>
  );
};

export default UnitListItem;

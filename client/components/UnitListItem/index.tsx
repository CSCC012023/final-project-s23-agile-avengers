import { UnitListItemProps } from '@/types/learning';
import { Heading } from '@chakra-ui/react';

const UnitListItem = ({ title }: UnitListItemProps) => {
  return <Heading size="lg"> {title} </Heading>;
};

export default UnitListItem;

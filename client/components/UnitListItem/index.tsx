import { Heading, Link } from '@chakra-ui/react';

type UnitListItemProps = {
  name: string;
  href: string;
};

const UnitListItem = ({ name, href }: UnitListItemProps) => {
  return (
    <Heading
      size="lg"
      textTransform="capitalize">
      <Link href={href}> {name}</Link>
    </Heading>
  );
};

export default UnitListItem;

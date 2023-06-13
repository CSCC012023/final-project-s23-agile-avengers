import {
  Card,
  CardHeader,
  Text,
  Heading,
  CardBody,
  CardFooter,
  Button,
  Progress,
} from '@chakra-ui/react';
import { Unit } from '@/types/components/Dashboard-Learning/types';

const UnitCard = (props: Unit) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md"> {props.name}</Heading>
      </CardHeader>
      <Progress
        value={80}
        ml={2}
        w="80%"
      />
      <CardBody>
        <Text>View a summary of all your customers over the last month.</Text>
      </CardBody>
      <CardFooter>
        <Button>Continue Learning</Button>
      </CardFooter>
    </Card>
  );
};
export default UnitCard;

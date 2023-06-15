import {
  Card,
  CardHeader,
  Text,
  Heading,
  CardBody,
  Button,
  Progress,
  Icon,
  Box,
} from '@chakra-ui/react';
import { Unit } from '@/types/components/Dashboard-Learning/types';
import { AiOutlineVideoCamera, AiOutlineFileText } from 'react-icons/ai';

const UnitCard = (props: Unit) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md"> {props.name}</Heading>
      </CardHeader>
      <Progress
        value={80}
        ml={5}
        w="80%"
      />
      <CardBody>
        <Text>5/9 completed</Text>
        <Box
          display={'inline-flex'}
          mt={5}>
          <Icon
            as={AiOutlineVideoCamera}
            boxSize={6}
          />
          <Text ml={2}> {props.content.name}</Text>
        </Box>
        <Button
          w={'100%'}
          fontSize={['xs', null, null, 'md']}>
          Continue Learning
        </Button>
      </CardBody>
    </Card>
  );
};
export default UnitCard;

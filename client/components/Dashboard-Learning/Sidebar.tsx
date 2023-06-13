'use client';

import {
  Card,
  CardHeader,
  Box,
  Heading,
  CardBody,
  Text,
  StackDivider,
  Stack,
  Divider,
} from '@chakra-ui/react';
import styles from '../../styles/components/sidebar.module.scss';

const Sidebar = () => (
  <Card bg="brand.gray">
    <CardHeader>
      <Heading size="md">Explore</Heading>
    </CardHeader>
    <Divider className={styles.divider} />
    <CardBody>
      <Stack
        divider={<StackDivider color="brand.black" />}
        spacing="4">
        <Box>
          <Heading
            size="xs"
            textTransform="uppercase">
            Summary
          </Heading>
          <Text
            pt="2"
            fontSize="sm">
            View a summary of all your clients over the last month.
          </Text>
        </Box>
        <Box>
          <Heading
            size="xs"
            textTransform="uppercase">
            Overview
          </Heading>
          <Text
            pt="2"
            fontSize="sm">
            Check out the overview of your clients.
          </Text>
        </Box>
        <Box>
          <Heading
            size="xs"
            textTransform="uppercase">
            Analysis
          </Heading>
          <Text
            pt="2"
            fontSize="sm">
            See a detailed analysis of all your business clients.
          </Text>
        </Box>
      </Stack>
    </CardBody>
  </Card>
);
export default Sidebar;

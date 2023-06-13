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
import { Course } from '@/types/learning';
type SideBarProps = {
  courses: Course[];
};
const Sidebar = ({ courses }: SideBarProps) => {
  return (
    <Card bg="brand.gray">
      <CardHeader>
        <Heading size="md">Explore</Heading>
      </CardHeader>
      <Divider className={styles.divider} />
      <CardBody>
        <Stack
          divider={<StackDivider color="brand.black" />}
          spacing="4">
          {courses.map((course) => (
            <Box key={course.name as string}>
              <Heading
                size="xs"
                textTransform="uppercase">
                {course.name}
              </Heading>
              <Text
                pt="2"
                fontSize="sm">
                Hello World
              </Text>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};
export default Sidebar;

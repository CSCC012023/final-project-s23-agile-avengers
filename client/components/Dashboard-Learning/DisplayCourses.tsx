'use client';

import {
  CardHeader,
  Heading,
  CardBody,
  VStack,
  StackDivider,
  Stack,
  HStack,
  Icon,
  Center,
} from '@chakra-ui/react';
import styles from '../../styles/components/sidebar.module.scss';
import { Course } from '@/types/learning';
import { AiFillCaretRight } from '@react-icons/all-files/ai/AiFillCaretRight';

type DisplayCoursesProps = {
  courses: Course[];
  headerString: String;
  selectedCourse: Course | undefined;
  setSelectedCourse: React.Dispatch<React.SetStateAction<Course | undefined>>;
};

const DisplayCourses = ({
  courses,
  headerString,
  selectedCourse,
  setSelectedCourse,
}: DisplayCoursesProps) => {
  const findCourseByName = (name: string) => {
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].name == name) {
        return courses[i];
      }
    }
    courses[0];
  };
  const handleClick = (e: any) => {
    setSelectedCourse(findCourseByName((e.target.parentElement as any).id));
  };
  return (
    <>
      <CardHeader>
        <Heading size="md">{headerString}</Heading>
      </CardHeader>
      <hr className={styles.divider} />
      <CardBody>
        <Stack
          divider={<StackDivider borderColor="brand.white" />}
          spacing="4">
          {courses.map((course) => (
            <HStack
              key={course.name.toString()}
              id={course.name.toString()}
              onClick={handleClick}
              textColor={
                selectedCourse && selectedCourse.name == course.name
                  ? 'brand.blue'
                  : 'brand.black'
              }>
              <Heading
                size="xs"
                display={'inline'}
                textTransform="uppercase">
                {course.name}
              </Heading>
              {selectedCourse && selectedCourse.name == course.name && (
                <Icon
                  as={AiFillCaretRight}
                  ml={2}
                  boxSize={'m'}
                />
              )}
            </HStack>
          ))}
        </Stack>
      </CardBody>
    </>
  );
};
export default DisplayCourses;

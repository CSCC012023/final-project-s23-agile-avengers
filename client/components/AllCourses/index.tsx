'use client';

import { Flex, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Course } from '@/types/learning';
import CourseCard from './CourseCard';

const AllCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const getCourses = async () => {
    try {
      // update to better promise handling
      const response: Response = await fetch('http://localhost:4000/courses');
      const jsonData: Course[] = await response.json();

      setCourses(jsonData);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  /* Without a dependency array the call to get all courses is only made once */
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <Text
        fontSize="5xl"
        m={10}>
        Courses
      </Text>
      <Flex
        alignItems={'center'}
        direction={'row'}
        gap="2"
        justifyContent={'space-around'}
        margin={'5%'}>
        {courses == undefined ? (
          <Spinner
            color="blue.500"
            emptyColor="gray.200"
            size="xl"
            speed="0.65s"
            thickness="4px"
          />
        ) : (
          courses.map(({ name, slug, icon }, index) => {
            return (
              <CourseCard
                icon={icon}
                key={index}
                name={name}
                slug={slug}
              />
            );
          })
        )}
      </Flex>
    </>
  );
};

export default AllCourses;

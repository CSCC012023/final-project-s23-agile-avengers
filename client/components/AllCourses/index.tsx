'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Spinner,
  Spacer,
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
} from '@chakra-ui/react';

import { SearchIcon } from '@chakra-ui/icons';

import { Course } from '@/types/learning';
import CourseCard from './CourseCard';

const AllCourses = () => {
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [autoComplete, setAutoComplete] = useState<Array<string>>([]);

  useEffect(() => {
    const getAutoCompleteList = async () => {
      try {
        if (searchTerm.length) {
          const response: Response = await fetch(
            `http://localhost:4000/search?text=${searchTerm}`
          );
          const jsonData: any = await response.json();
        }
      } catch (e: any) {
        console.error(e);
      }
    };

    getAutoCompleteList();
  }, []);

  const handleSubmitSearch = async (e: any) => {
    e.preventDefault(); // prevents default behavior of submitting form and refreshing the page

    try {
      if (searchTerm.length === 0) {
        getCourses();
      } else {
        const response: Response = await fetch(
          `http://localhost:4000/search?text=${searchTerm}`
        );
        const jsonData: any = await response.json();
        if (Object.keys(jsonData).length === 0) {
          console.log('search is empty');
          // show no results found
        } else {
          setCourses(jsonData);
        }
      }
      setSearchTerm('');
    } catch (e: any) {
      console.error(e.message);
    }
  };

  const getCourses = async () => {
    try {
      // update to better promise handling
      const response: Response = await fetch('http://localhost:4000/courses');
      const jsonData: any = await response.json();

      setCourses(jsonData);
    } catch (e: any) {
      console.error(e.message);
    }
  };

  /* Without a dependency array the call to get all courses is only made once */
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <Flex>
        <Text fontSize="5xl">Courses</Text>
        <Box margin={'50px'}>
          <form onSubmit={handleSubmitSearch}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.900" />
              </InputLeftElement>
              <Input
                placeholder="Explore learning..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </form>
        </Box>
      </Flex>
      <Flex
        gap="2"
        direction={'row'}
        margin={'5%'}
        alignItems={'center'}
        justifyContent={'space-around'}>
        {courses == undefined ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          courses.map(({ name, slug, icon }, index) => {
            return (
              <CourseCard
                name={name}
                slug={slug}
                icon={icon}
                key={index}
              />
            );
          })
        )}
      </Flex>
    </>
  );
};

export default AllCourses;

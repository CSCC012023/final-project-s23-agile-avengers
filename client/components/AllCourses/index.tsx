'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Center,
  Flex,
  Text,
  Button,
  Spinner,
  HStack,
  Tag,
  Spacer,
  Link,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';

import { SearchIcon } from '@chakra-ui/icons';

import { Course } from '@/types/learning';
import CourseCard from './CourseCard';

const AllCourses = () => {
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [autoComplete, setAutoComplete] = useState<Array<any>>([]);
  const [courseSlugByUnit, setCourseSlugByUnit] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getAutoCompleteList = async () => {
      if (searchTerm.length) {
        try {
          const response: Response = await fetch(
            `http://localhost:4000/searchAutoComplete?text=${searchTerm}`
          );
          const searchAutoComplete: any = await response.json();
          setAutoComplete(searchAutoComplete);
        } catch (e: any) {
          console.error(e);
        }
      } else {
        setAutoComplete([]);
      }
    };

    getAutoCompleteList();
  }, [searchTerm]);

  const handleSubmitSearch = async (e: any) => {
    e.preventDefault(); // prevents default behavior of submitting form and refreshing the page

    try {
      if (!searchTerm.length) {
        getCourses();
      } else {
        const response: Response = await fetch(
          `http://localhost:4000/search?text=${searchTerm}`
        );
        const jsonData: any = await response.json();
        if (Object.keys(jsonData).length !== 0) {
          setCourses(jsonData);
        }
        console.log(jsonData);
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

  const handleUnitClick = async (unitID: string) => {
    setIsLoading(true);
    try {
      const response: Response = await fetch(
        `http://localhost:4000/course?id=${unitID}`
      );
      const jsonData: any = await response.json();

      setCourseSlugByUnit(jsonData[0].slug);
      console.log('courseSlugByUnit', courseSlugByUnit);
    } catch (e: any) {
      console.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Flex
        m={10}
        flexDirection={'column'}>
        <Text fontSize="5xl">Courses</Text>
        <Box margin={'50px'}>
          <Center>
            <InputGroup width={'50%'}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.900" />
              </InputLeftElement>
              <Input
                placeholder="Explore learning..."
                onClick={onOpen}
                isReadOnly
              />
            </InputGroup>
          </Center>
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

      <Modal
        onClose={() => {
          setSearchTerm('');
          onClose();
        }}
        isOpen={isOpen}
        isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <form onSubmit={handleSubmitSearch}>
              <InputGroup width={'100%'}>
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
          </ModalHeader>
          <ModalBody>
            {autoComplete.length > 0 && (
              <Flex
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'space-around'}>
                {autoComplete.map((item) => {
                  if (item.source === 'course') {
                    return (
                      <Link
                        key={item._id}
                        width={'100%'}
                        margin={'10px'}
                        href={`/learning/${item.slug}`}>
                        <Box
                          width={'100%'}
                          p={5}
                          borderRadius={10}
                          backgroundColor={'gray.200'}
                          boxShadow={'0 2px 4px rgba(0, 0, 0, 0.2)'}>
                          <HStack>
                            <Text fontWeight={'semibold'}>{item.name}</Text>
                            <Spacer />
                            <Tag
                              variant="outline"
                              colorScheme="blue">
                              {item.source.toString().toUpperCase()}
                            </Tag>
                          </HStack>
                        </Box>
                      </Link>
                    );
                  } else {
                    // need to add href to Units page once @Aditya finishes Units Page
                    return (
                      <Link
                        key={item._id}
                        // href={`/learning/${courseByUnit?.slug}/${item.slug}`}
                        width={'100%'}
                        margin={'10px'}
                        onClick={() => handleUnitClick(item._id)}>
                        <Box
                          width={'100%'}
                          p={5}
                          borderRadius={10}
                          backgroundColor={'gray.200'}
                          boxShadow={'0 2px 4px rgba(0, 0, 0, 0.2)'}>
                          <HStack>
                            <Text fontWeight={'semibold'}>{item.name}</Text>
                            <Spacer />
                            <Tag
                              variant="outline"
                              colorScheme="teal">
                              {item.source.toString().toUpperCase()}
                            </Tag>
                          </HStack>
                        </Box>
                      </Link>
                    );
                  }
                })}
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                setSearchTerm('');
                onClose();
              }}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AllCourses;

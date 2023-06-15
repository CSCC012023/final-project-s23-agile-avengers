'use client';
import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { Spinner, Center } from '@chakra-ui/react';
import UnitGrid from '@/components/Dashboard-Learning/UnitGrid';
import Sidebar from '../../components/Dashboard-Learning/Sidebar';
import { useUser, useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { Course } from '@/types/learning';

const DashboardPage = () => {
  const { user } = useUser();
  const { isLoaded, userId } = useAuth();
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [areCoursesAndUnitsReady, setAreCoursesAndUnitsReady] = useState(false);
  const [selectedCourse, setSeletctedCourse] = useState<Course>();

  const getCourses = async () => {
    try {
      // update to better promise handling
      const response: Response = await fetch('http://localhost:4000/courses');
      const jsonData: any = await response.json();
      console.log('heya');
      setCourses(jsonData);
      setSeletctedCourse(jsonData[0]);
      setAreCoursesAndUnitsReady(true);
    } catch (e: any) {
      console.error(e.message);
    }
  };
  /* Without a dependency array the call to get all courses is only made once */
  useEffect(() => {
    getCourses();
  }, []);

  if (!isLoaded || !userId || !areCoursesAndUnitsReady) {
    // need to check for userId as well as its a protected route {
    return (
      <Center paddingTop={'50px'}>
        <Spinner size="lg" />;
      </Center>
    );
  }

  return (
    <>
      <Grid
        h="800px"
        templateColumns="repeat(3, 1fr)"
        gap={4}
        m={3}>
        <GridItem colSpan={1}>
          <Sidebar
            courses={courses}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSeletctedCourse}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <UnitGrid />
        </GridItem>
      </Grid>
    </>
  );
};

export default DashboardPage;

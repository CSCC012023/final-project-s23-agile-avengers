'use client';

import { Grid, GridItem, Spinner } from '@chakra-ui/react';

import UnitGrid from '@/components/Dashboard-Learning/UnitGrid';
import styles from '@/styles/pages/Dashboard.module.scss';
import {
  CourseWithUnits,
  Unit,
} from '@/types/components/Dashboard-Learning/types';
import { Course } from '@/types/learning';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Sidebar from '../../components/Dashboard-Learning/Sidebar';

const DashboardPage = () => {
  const { isLoaded, userId } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isSideBarReady, setIsSideBarReady] = useState(false);
  const [selectedCourse, setSeletctedCourse] = useState<Course>();
  const [units, setUnits] = useState<Array<Unit>>();
  const [isUnitGridReady, setIsUnitGridReady] = useState(false);

  const getUnits = async () => {
    if (!selectedCourse) return;

    try {
      const url = `http://localhost:4000/units?courseSlug=${selectedCourse?.slug}`;
      const response = await fetch(url);
      const data: CourseWithUnits = await response.json();
      setUnits(data.units);
      setIsUnitGridReady(true);
    } catch (error) {
      setUnits(undefined);
      console.error((error as Error).message);
    }
  };

  const getCourses = async () => {
    try {
      // update to better promise handling
      const response = await fetch('http://localhost:4000/courses');
      const jsonData: Course[] = await response.json();
      setCourses(jsonData);
      setSeletctedCourse(jsonData[0]);
      setIsSideBarReady(true);
    } catch (error) {
      console.error((error as Error).message);
    }
  };
  /* Without a dependency array the call to get all courses is only made once */
  useEffect(() => {
    getCourses();
  }, []);
  useEffect(() => {
    setIsUnitGridReady(false);
    getUnits();
  }, [selectedCourse]);

  if (!isLoaded || !userId || !isSideBarReady)
    // need to check for userId as well as its a protected route {
    return (
      <div className={styles.center}>
        <Spinner
          color="blue.500"
          emptyColor="gray.200"
          m={'auto'}
          size="xl"
          speed="0.65s"
          thickness="4px"
        />
      </div>
    );

  return (
    <>
      <Grid
        gap={4}
        h="800px"
        m={3}
        templateColumns="repeat(3, 1fr)">
        <GridItem colSpan={1}>
          <Sidebar
            courses={courses}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSeletctedCourse}
          />
        </GridItem>
        <GridItem colSpan={2}>
          {isUnitGridReady && units && selectedCourse ? (
            <UnitGrid
              courseSlug={selectedCourse.slug}
              units={units}
            />
          ) : (
            <div className={styles.center}>
              <Spinner size="lg" />
            </div>
          )}
        </GridItem>
      </Grid>
    </>
  );
};

export default DashboardPage;

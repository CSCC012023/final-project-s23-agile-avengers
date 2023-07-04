'use client';
import { Grid, GridItem, Spinner } from '@chakra-ui/react';

import UnitGrid from '@/components/Dashboard-Learning/UnitGrid';
import {
  CourseWithUnits,
  Unit,
} from '@/types/components/Dashboard-Learning/types';
import { Course, UnitWithProgress } from '@/types/learning';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Sidebar from '../../components/Dashboard-Learning/Sidebar';
import styles from '../../styles/pages/Dashboard.module.scss';

const DashboardPage = () => {
  const { isLoaded, userId } = useAuth();
  const [exploreCourses, setExploreCourses] = useState<Array<Course>>([]);
  const [userCourses, setUserCourses] = useState<Array<Course>>([]);
  const [isSideBarReady, setIsSideBarReady] = useState(false);
  const [selectedCourse, setSeletctedCourse] = useState<Course>();
  const [units, setUnits] = useState<Array<Unit>>();
  const [isUnitGridReady, setIsUnitGridReady] = useState(false);
  const [userUnits, setUserUnits] = useState<Array<UnitWithProgress>>([]);

  const isObjectEmpty = (objectName: any) => {
    return Object.keys(objectName).length === 0;
  };

  const isCourseInList = (courses: Course[], slug: String): Boolean => {
    for (const course of courses) {
      if (course.slug === slug) {
        return true;
      }
    }
    return false;
  };
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
      /* set users courses*/
      const userCoursesResponse: Response = await fetch(
        `http://localhost:4000/learningProgress?userID=${userId}`
      );
      const userCoursesData = await userCoursesResponse.json();
      const loadedUserCourses: Course[] = isObjectEmpty(userCoursesData)
        ? []
        : userCoursesData.courses.map((elem: any) => elem.courseID);
      setUserCourses(loadedUserCourses);
      const loadedUserUnits: UnitWithProgress[] = isObjectEmpty(userCoursesData)
        ? []
        : userCoursesData.units.map((elem: any) => {
            return { unit: elem.unitID, progress: elem.progress };
          });
      setUserUnits(loadedUserUnits);

      /* set explore courses*/
      const exploreCoursesResponse: Response = await fetch(
        'http://localhost:4000/courses'
      );
      const exploreCoursesData: Course[] = await exploreCoursesResponse.json();
      const filteredCourses = exploreCoursesData.filter(
        (elem) => !isCourseInList(loadedUserCourses, elem.slug)
      );

      setExploreCourses(filteredCourses);

      /* set default selected course*/
      loadedUserCourses.length > 0
        ? setSeletctedCourse(loadedUserCourses[0])
        : setSeletctedCourse(filteredCourses[0]);
      setIsSideBarReady(true);
    } catch (error) {
      console.error((error as Error).message);
    }
  };
  /* Without a dependency array the call to get all courses is only made once */
  useEffect(() => {
    getCourses();
  }, [userId]);
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
            exploreCourses={exploreCourses}
            userCourses={userCourses}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSeletctedCourse}
          />
        </GridItem>
        <GridItem colSpan={2}>
          {isUnitGridReady && units && selectedCourse ? (
            <UnitGrid
              units={units}
              userUnits={userUnits}
              courseSlug={selectedCourse.slug}
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

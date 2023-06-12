"use client";

import React, { useEffect, useState } from 'react';

import { Course } from '../../../server/types/learning';

import {
   Flex,
   Text, 
   Spinner
} from '@chakra-ui/react'

import CourseCard from './CourseCard';

const AllCourses = () => {
    
    const [courses, setCourses] = useState<Array<Course>>([])

    const getCourses = async () => {
        try {
            // update to better promise handling
            const response: Response = await fetch("http://localhost:5000/courses");
            const jsonData: any = await response.json()

            setCourses(jsonData);

        } catch (e: any) {
            console.error(e.message)
        }
    }

    /* Without a dependency array the call to get all courses is only made once */
    useEffect(() => {
        getCourses();
    }, [])

    return (
        <>
         <Text fontSize='5xl' m={10}>Courses.</Text>
         <Flex gap='2' direction={'row'} margin={'5%'} alignItems={'center'} justifyContent={'space-around'}>
            { courses == undefined ? <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' /> : courses.map((course, index) => {return <CourseCard name={course.name} image={course.icon} key={index} />}) }
         </Flex>
        </>
    );

};

export default AllCourses;
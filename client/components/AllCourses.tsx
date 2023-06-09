"use client";

import React, { useEffect, useState } from 'react';

import {
   Flex,
   Text, 
   Card,
   CardHeader, 
   CardBody, 
   Box,
   CardFooter,
   Spacer
} from '@chakra-ui/react'

import { QuestionIcon } from '@chakra-ui/icons'

const ListCourses = () => {

    const [courses, setCourses] = useState<Array<any>>([])

    const getCourses = async () => {
        try {
            // probably need to use better Promise syntax, then catch etc.
            //const response = await fetch("http://localhost:5000/courses");
            //const jsonData = await response.json();

            const jsonData = [{
                "name": "fjeafbea",
                "image": "fwrfwrlkgklwb"
            }];

            setCourses(jsonData);
            
        } catch (e: any) {
            console.error(e.message)
        }
    }

    /*useEffect(() => {
        getCourses();
    }, [courses])*/

    return (
        <>
         <Text fontSize='5xl' margin={10}>Courses.</Text>
         <Flex direction={'column'} width={'100%'} margin={'5%'}>
            <Card cursor={'pointer'} background={'gray.200'} height={250} width={250} borderRadius={10}>
            <CardHeader>
            </CardHeader>
            <CardBody>
             <Flex direction="column" justifyContent={'center'} alignItems={'center'}>
             <Text align="center" fontWeight={'bold'} fontSize='2xl'>Money101</Text>
             <QuestionIcon mt={5} boxSize={70}/>
             </Flex>
            </CardBody>
            </Card>
         </Flex>
        </>
    );

};

export default ListCourses;
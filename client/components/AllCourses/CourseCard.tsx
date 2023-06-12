"use client";

import React from 'react';

import {
   Flex,
   Text, 
   Card,
   CardHeader, 
   CardBody, 
   Image,
} from '@chakra-ui/react'

/* An indiviudal course card, with all relevant properties passed in as props */
const CourseCard = (props: any) => {

    return (
            <Card cursor={'pointer'} background={'gray.200'} height={250} width={250} borderRadius={10}>
            <CardHeader>
            </CardHeader>
            <CardBody>
             <Flex direction="column" justifyContent={'center'} alignItems={'center'}>
             <Text align="center" fontWeight={'bold'} fontSize='3xl'>{props.name}</Text>
             <Image mt={2} w={90} h={90} src={props.image} alt={props.name}></Image>
             </Flex>
            </CardBody>
            </Card>
    );

};

export default CourseCard;
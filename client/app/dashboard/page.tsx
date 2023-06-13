"use client";

import React from 'react';

import { Card, CardHeader, CardBody, Heading, Text, Flex, Box, Spacer } from '@chakra-ui/react'

import { useUser, UserButton, useAuth } from "@clerk/nextjs";

const DashboardPage = () => {

    const { user } = useUser();
    const { isLoaded, userId } = useAuth();

    if(user?.firstName === null){
        user.firstName = "No Name"
    }

    if (!isLoaded || !userId) {// need to check for userId as well as its a protected route {
           return null;
    }
    
    return (
        <>
            <Flex minWidth='max-content' alignItems='center' gap='2' padding={"18px"}>
            <Box p='2'>
                <Heading size='md'>FinLearn</Heading>
            </Box>
            <Spacer />
            <UserButton afterSignOutUrl="/"/>
            </Flex>
            <Card align='center'>
                <CardHeader>
                    <Heading size='md'>{user?.firstName}'s dashboard</Heading>
                </CardHeader>
                <CardBody>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi veniam dicta eum repellendus doloribus ducimus sed culpa, dolorem magnam incidunt error tempora voluptatibus obcaecati possimus dolore modi cupiditate nihil ab!</Text>
                </CardBody>
            </Card>
        </>
       
    );
};

export default DashboardPage;

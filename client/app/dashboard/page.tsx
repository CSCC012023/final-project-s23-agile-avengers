'use client';

import React from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Flex,
  Box,
  Spacer,
  Spinner,
  Center,
} from '@chakra-ui/react';

import { useUser, UserButton, useAuth } from '@clerk/nextjs';

const DashboardPage = () => {
  const { user } = useUser();
  const { isLoaded, userId } = useAuth();

  if (!isLoaded || !userId) {
    // need to check for userId as well as its a protected route {
    return (
      <Center paddingTop={'50px'}>
        <Spinner size="lg" />;
      </Center>
    );
  }

  return (
    <>
      <Card align="center">
        <CardHeader>
          <Heading size="md">My dashboard</Heading>
        </CardHeader>
        <CardBody>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            veniam dicta eum repellendus doloribus ducimus sed culpa, dolorem
            magnam incidunt error tempora voluptatibus obcaecati possimus dolore
            modi cupiditate nihil ab!
          </Text>
        </CardBody>
      </Card>
    </>
  );
};

export default DashboardPage;

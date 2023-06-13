'use client';

import styles from '@/styles/pages/Home.module.scss';
import { UserButton } from "@clerk/nextjs";

import { Button, ButtonGroup, Flex, Box, Heading, Spacer } from '@chakra-ui/react'

import { useAuth, useUser } from "@clerk/nextjs";
import SignInBtn from './components/SignInBtn';
import SignUpBtn from './components/SignUpBtn';

export default function Home() {
  const { title } = styles;
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  // In case the user signs out while on the page.
  // if (!isLoaded || !userId) {
  //   return null;
  // }

  const { isSignedIn, user } = useUser();

  console.log("isLoaded", isLoaded);
  console.log("user userid sessionid", user, userId, sessionId);


  return(
    isSignedIn ? (
      <Flex minWidth='max-content' alignItems='center' gap='2' padding={"18px"}>
        <Box p='2'>
          <Heading size='md'>FinLearn</Heading>
        </Box>
        <Spacer />
        <UserButton afterSignOutUrl="/"/>
        {/* <div>
        Hello, "{userId}" your current active session is {sessionId}
        </div> */}
      </Flex>
    ) 
    : (
      <Flex minWidth='max-content' alignItems='center' gap='2' padding={"18px"}>
        <Box p='2'>
          <Heading size='md'>FinLearn</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap='2'>
          <Button colorScheme='teal' variant='outline'>
            <SignUpBtn />
          </Button>
          <Button colorScheme='teal'>
          <SignInBtn />
          </Button>
        </ButtonGroup>
      </Flex>
    )

  );
  
}

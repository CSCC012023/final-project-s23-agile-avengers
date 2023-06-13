'use client';

import { SignUpButton, SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { Button, ButtonGroup, Flex, Box, Heading, Spacer } from '@chakra-ui/react'
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {

  // const { isSignedIn } = useUser();
  const { isLoaded, userId, isSignedIn } = useAuth();

  
  useEffect(() => {
    const body = { userID: userId}; // description is the key which is the same as the database schema field
    const postData = async () => {
      const response = await fetch(`http://localhost:4000/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }
    
    postData()
    .catch(console.error)
    
  }, [userId])
  
  if (!isLoaded) {
    return null;
  }

  return(
    isSignedIn ? (
      <Flex minWidth='max-content' alignItems='center' gap='2' padding={"18px"}>
        <Box p='2'>
          <Heading size='md'>FinLearn</Heading>
        </Box>
        <Spacer />
        <UserButton afterSignOutUrl="/"/>
      </Flex>
    ) 
    : (
      <Flex minWidth='max-content' alignItems='center' gap='2' padding={"18px"}>
        <Box p='2'>
          <Heading size='md'>FinLearn</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap='2'>
          <SignUpButton>
            <Button colorScheme='teal' variant='outline'>
              Sign Up
            </Button>
          </SignUpButton>
          <SignInButton>
            <Button colorScheme='teal'>
              Sign In
            </Button>
          </SignInButton>
        </ButtonGroup>
      </Flex>
    )

  );
  
}

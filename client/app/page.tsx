'use client';

import { UserButton } from "@clerk/nextjs";
import { Button, ButtonGroup, Flex, Box, Heading, Spacer } from '@chakra-ui/react'
import { useUser } from "@clerk/nextjs";
import SignInBtn from './components/SignInBtn';
import SignUpBtn from './components/SignUpBtn';

export default function Home() {
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isSignedIn } = useUser();

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

'use client';

import { SignIn } from '@clerk/nextjs';
import { Center } from '@chakra-ui/react';

export default function Page() {
  return (
    <Center marginY={'6vh'}>
      <SignIn
        redirectUrl={'/'}
        appearance={{
          layout: {
            logoPlacement: 'inside',
          },
          variables: {
            colorPrimary: 'black',
          },
        }}
      />
    </Center>
  );
}

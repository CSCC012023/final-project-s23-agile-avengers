"use client";

import { SignIn } from "@clerk/nextjs";
import { Center } from '@chakra-ui/react'

export default function Page() {
  return (
    <Center paddingTop={"100px"}>
      <SignIn />
    </Center>
  );
}
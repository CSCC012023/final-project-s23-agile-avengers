'use client';

import styles from '@/styles/pages/Home.module.scss';
import { UserButton } from "@clerk/nextjs";

import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const { title } = styles;
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  return(

    <>
      <h1 className={title}>Hello</h1>;
      <UserButton afterSignOutUrl="/"/>
      <div>
      Hello, "{userId}" your current active session is {sessionId}
      </div>
    </>

  );
  
}

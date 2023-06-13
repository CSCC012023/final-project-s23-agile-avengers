'use client';

import styles from '@/styles/pages/Home.module.scss';
import { UserButton } from "@clerk/nextjs";

import { useAuth, useUser } from "@clerk/nextjs";
import SignInBtn from './components/SignInBtn';

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
    <>
      <h1 className={title}>Hello</h1>
      <UserButton afterSignOutUrl="/"/>
      <div>
      Hello, "{userId}" your current active session is {sessionId}
      </div>
    </> ) 
    : (
      <>
       <SignInBtn />
      </>
    )


  );
  
}

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SignupForm } from "../components/AuthComponents";

const Signup = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  console.log(isRedirecting, router, session);
  useEffect(() => {
    if (session && !isRedirecting && router.isReady) {
      // display some message to the user that he is being redirected
      setIsRedirecting(true);
      // redirect to the return url or home page
      router.push((router.query.returnUrl as string) || "/");
    }
  }, [session, isRedirecting, router]);

  return (
    <>
      <SignupForm />
    </>
  );
};

export default Signup;

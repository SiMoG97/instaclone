import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useRedirectLoginSignup() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && !isRedirecting && router.isReady) {
      // display some message to the user that he is being redirected
      setIsRedirecting(true);
      // redirect to the return url or home page
      router.push((router.query.returnUrl as string) || "/");
    }
  }, [session, isRedirecting, router]);
}

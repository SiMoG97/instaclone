import { getSession } from "next-auth/react";
import { SignupForm } from "../components/AuthComponents";
import { useRedirectLoginSignup } from "../Hooks/useRedirectLoginSignup";
import { GetServerSidePropsContext } from "next";

const Signup = () => {
  useRedirectLoginSignup();

  return (
    <>
      <SignupForm />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: context.query.prevAsPath || "/",
        permanente: false,
      },
      props: {
        session,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
export default Signup;

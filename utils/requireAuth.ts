import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export async function requireAuth(ctx: GetServerSidePropsContext, cb: any) {
  const session = await getSession(ctx);
  //   console.log(g)
  if (!session) {
    return {
      redirect: {
        destination: `/Login/?prevAsPath=${ctx.req.url}`,
        permanent: false,
      },
    };
  }
  return cb({ session });
}

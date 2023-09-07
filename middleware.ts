import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      console.log("just testing");
      return false;
    },
  },
});

export const config = { matcher: ["/", "/Profile", "/Settings"] };

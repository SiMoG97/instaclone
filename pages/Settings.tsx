import { GetServerSidePropsContext } from "next";
import Footer from "../components/Footer";
import SettingsContainer from "../components/SettingsComponents";
import { Session } from "next-auth";
import { requireAuth } from "../utils/requireAuth";

const Settings = ({ callbackUrl }: { callbackUrl: string }) => {
  console.log(callbackUrl);
  return (
    <div>
      <SettingsContainer />
      <Footer centered />
    </div>
  );
};

Settings.requireAuth = true;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return requireAuth(ctx, ({ session }: { session: Session }) => {
    return {
      props: { session },
    };
  });
}
export default Settings;

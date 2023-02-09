import styles from "./settings.module.scss";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { SettingsLeftbar } from "./SettingsLeftbar";
import { SettingsRightMainSide } from "./SettingsRightMainSide";

function SettingsContainer() {
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    if (!router.query.edit) {
      router.push(`${router.pathname}?edit=${routes[0]}`);
    }
  }, [router.isReady]);

  return (
    <div className={styles.container}>
      <SettingsLeftbar route={router.query.edit as SettingsRoutesType} />
      <SettingsRightMainSide route={router.query.edit as SettingsRoutesType} />
    </div>
  );
}
export default SettingsContainer;

export const routes = [
  "Edit_profile",
  "Change_passowrd",
  "Apps_and_websites",
  "Email_notifications",
  "Push_notifications",
  "Manage_contacts",
  "Privacy_and_security",
  "Supervision",
  "Login_activity",
  "Emails_from_Instagram",
  "Help",
] as const;

export type SettingsRoutesType = typeof routes[number];
// const navItems = routes.map((item) => item.split("_").join(" "));

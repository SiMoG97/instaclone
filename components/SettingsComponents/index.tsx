import styles from "./settings.module.scss";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { SettingsLeftbar } from "./SettingsLeftbar";
import { SettingsRightMainSide } from "./SettingsRightMainSide";

function SettingsContainer() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  function openNav() {
    setIsNavOpen(() => true);
  }
  function closeNav() {
    setIsNavOpen(() => false);
  }
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    if (!router.query.edit) {
      router.push(`${router.pathname}?edit=${routes[0]}`);
    }
  }, [router.isReady]);

  return (
    <div className={styles.container}>
      <div className={styles.sideAndMainParent}>
        <SettingsLeftbar
          route={router.query.edit as SettingsRoutesType}
          closeNav={closeNav}
          isOpen={isNavOpen}
        />
        <SettingsRightMainSide
          route={router.query.edit as SettingsRoutesType}
          openNav={openNav}
        />
      </div>
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
  "Emails_from_Instagram",
  "Theme",
  "Help",
] as const;

export type SettingsRoutesType = typeof routes[number];
// const navItems = routes.map((item) => item.split("_").join(" "));

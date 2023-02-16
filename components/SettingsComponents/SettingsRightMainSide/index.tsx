import styles from "../settings.module.scss";
import { SettingsRoutesType } from "..";
import { AppsAndWebsites } from "./AppsAndWebsites";
import { ChangePassword } from "./ChangePassword";
import { EmailNotification } from "./EmailNotification";
import { PushNotifications } from "./PushNotifications";
import { ManageContacts } from "./ManageContacts";
import { PrivacyAndSecurity } from "./PrivacyAndSecurity";
import { SelectTheme } from "./SelectTheme";
import { LoginActivity } from "./LoginActivity";
import { EmailsFromInstagram } from "./EmailsFromInstagram";
import { Help } from "./Help";
import { EditProfile } from "./EditProfile";
import { MainHeader } from "./MainHeader";

type PropsType = {
  route: SettingsRoutesType;
  openNav: () => void;
};
export function SettingsRightMainSide({ route, openNav }: PropsType) {
  return (
    <div className={styles.mainSide}>
      <MainHeader
        openNav={openNav}
        title={(route || "").split("_").join(" ")}
      />
      <RightSideSwitcher route={route} />
    </div>
  );
}

function RightSideSwitcher({ route }: { route: SettingsRoutesType }) {
  if (route === "Change_passowrd") {
    return <ChangePassword />;
  } else if (route === "Apps_and_websites") {
    return <AppsAndWebsites />;
  } else if (route === "Email_notifications") {
    return <EmailNotification />;
  } else if (route === "Push_notifications") {
    return <PushNotifications />;
  } else if (route === "Manage_contacts") {
    return <ManageContacts />;
  } else if (route === "Privacy_and_security") {
    return <PrivacyAndSecurity />;
  } else if (route === "Theme") {
    return <SelectTheme />;
  } else if (route === "Login_activity") {
    return <LoginActivity />;
  } else if (route === "Emails_from_Instagram") {
    return <EmailsFromInstagram />;
  } else if (route === "Help") {
    return <Help />;
  } else {
    return <EditProfile />;
  }
}

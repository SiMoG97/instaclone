import styles from "../settings.module.scss";
import { SettingsRoutesType } from "..";
import { AppsAndWebsites } from "./AppsAndWebsites";
import { ChangePassword } from "./ChangePassword";
import { EmailNotification } from "./EmailNotification";
import { PushNotifications } from "./PushNotifications";
import { ManageContacts } from "./ManageContacts";
import { PrivacyAndSecurity } from "./PrivacyAndSecurity";
import { Supervision } from "./SuperVision";
import { LoginActivity } from "./LoginActivity";
import { EmailsFromInstagram } from "./EmailsFromInstagram";
import { Help } from "./Help";
import { EditProfile } from "./EditProfile";

type PropsType = {
  route: SettingsRoutesType;
};
export function SettingsRightMainSide({ route }: PropsType) {
  return (
    <div className={styles.mainSide}>
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
  } else if (route === "Supervision") {
    return <Supervision />;
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

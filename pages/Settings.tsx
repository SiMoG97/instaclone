import Footer from "../components/Footer";
import SettingsContainer from "../components/SettingsComponents";

const Settings = () => {
  return (
    <div>
      <SettingsContainer />
      <Footer centered />
    </div>
  );
};

Settings.requireAuth = true;

export default Settings;

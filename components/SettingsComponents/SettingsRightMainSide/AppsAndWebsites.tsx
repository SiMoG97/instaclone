import { useState } from "react";
import styles from "../settings.module.scss";

type TabsType = "Active" | "Expired" | "Removed";
export function AppsAndWebsites() {
  const [tab, setTab] = useState<TabsType>("Active");
  return (
    <div className={styles.appsAndWebsites}>
      <div>Apps and Websites</div>
      <div className={styles.tabsContainer} role="tablist">
        {tabs.map((tabItem) => (
          <div
            key={tabItem}
            className={styles.tab}
            role="tab"
            aria-disabled={!(tabItem === tab)}
            aria-selected={tabItem === tab}
            onClick={() => {
              setTab(() => tabItem);
            }}
          >
            {tabItem}
          </div>
        ))}
      </div>
      <div>
        {tabPanels.map((tabPanel) => (
          <div
            role="tabpanel"
            aria-hidden={tab !== tabPanel.section}
            key={tabPanel.section + "Panel"}
          >
            <div className={styles.text}>{tabPanel.text}</div>
            <div className={styles.subtitile}>{tabPanel.subtitile}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const tabs: TabsType[] = ["Active", "Expired", "Removed"];

const tabPanels = [
  {
    section: "Active",
    text: "These are apps and websites you've connected to your Instagram account. They can access non-public information that you choose to share with them.",
    subtitile:
      "You have not authorized any applications to access your Instagram account.",
  },
  {
    section: "Expired",
    text: "These are apps and websites you've connected to your Instagram account that you may not have used in the last 90 days. They're no longer able to access your non-public information, but may still have the information you shared while they were active. \"Non-public\" means information that an app can only access if you choose to share it when you log in with your Instagram account (like your email address).",
    subtitile:
      "You have no expired applications that had access to your Instagram account.",
  },
  {
    section: "Removed",
    text: 'These are apps and websites that are no longer connected to your Instagram account. They can\'t access your non-public information anymore, but may still have the information you shared while they were active. "Non-public" means information that an app can only access if you choose to share it when you log in with your Instagram account (like your email address). You can ask an app to delete your information. To do it, review their Privacy Policy for details and contact information. If you contact an app, they may need your User ID.',
    subtitile:
      "You have no removed applications that had access to your Instagram account.",
  },
];

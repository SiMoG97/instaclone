import { useState } from "react";
import styles from "../settings.module.scss";

type TabsType = "Security" | "Others";

export function EmailsFromInstagram() {
  const [tab, setTab] = useState<TabsType>("Security");

  return (
    <div className={styles.emailsFromInstagram}>
      <div>
        <h2>Emails From Instagram</h2>
      </div>
      <div>
        <div role="tablist">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const tabs: TabsType[] = ["Security", "Others"];
const tabPanels = [
  {
    section: "Security",
    text: "Security and login emails from Instagram in the last 14 days will appear here. You can use it to verify which emails are real and which are fake.",
  },
  {
    section: "Others",
    text: "Other emails from Instagram in the last 14 days that aren't about security or login will appear here. You can use it to verify which emails are real and which are fake.",
  },
];

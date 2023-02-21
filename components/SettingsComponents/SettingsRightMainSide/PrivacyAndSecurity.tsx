import Button from "../../Button";
import Checkbox from "../../FormComponents/Checkbox";
import { RadioInput } from "../../FormComponents/RadioInput";
import SwitchButton from "../../FormComponents/SwitchButton";
import styles from "../settings.module.scss";

export function PrivacyAndSecurity() {
  return (
    <div className={styles.privacyAndSecurityContainer}>
      {/* Account Privacy */}
      <UnderlineSection title="Account privacy">
        <Checkbox
          id="privateAccount"
          labelText="Private account"
          style={{ margin: "1.6rem 0" }}
        />
        <p>
          {`When your account is public, your profile and posts can be seen by anyone, on or off Instagram, even if they don't have an Instagram account.`}
        </p>
        <p>
          {`When your account is private, only the followers you approve can see what you share, including your photos or videos on hashtag and location pages, and your followers and following lists. Learn more`}
          <a href="#">Learn more</a>
        </p>
      </UnderlineSection>
      {/* Activity Status */}
      <UnderlineSection title="Activity Status">
        <Checkbox
          id="activityStatus"
          labelText="Show Activity Status"
          style={{ margin: "1.6rem 0" }}
        />
        <p>
          {`Allow accounts you follow and anyone you message to see when you were last active or are currently active on Instagram apps. When this is turned off, you won't be able to see the Activity Status of other accounts.`}
          <a href="#" style={{ width: "100%" }}>
            Learn more
          </a>
        </p>
        <p>{`You can continue to use our services if active status is off.`}</p>
      </UnderlineSection>
      {/* Story */}
      <UnderlineSection title="Story">
        <Button mainShape={false} mainColor={false} bold>
          Edit story settings
        </Button>
      </UnderlineSection>
      {/* Comments */}
      <UnderlineSection title="Comments">
        <Button mainShape={false} mainColor={false} bold>
          Edit comment settings
        </Button>
      </UnderlineSection>
      {/* Photos of You */}
      <UnderlineSection title="Photos of You">
        <div className={styles.radiosParent} style={{ margin: "0" }}>
          {["Add automatically", "Add manually"].map((value, i) => (
            <RadioInput
              size="sm"
              key={value}
              id={`${value + i}`}
              value={value}
              bold
              // {...register(item.name)}
            />
          ))}
        </div>
        <p>
          Choose how you want photos of you added to your profile.
          <a href="#"> Learn more</a> about Photos of You.
        </p>
      </UnderlineSection>
      {/* Two-Factor Authentication */}
      <UnderlineSection title="Two-Factor Authentication">
        <Button mainShape={false} mainColor={false} bold>
          Edit Two-Factor Authentication Setting
        </Button>
      </UnderlineSection>
      {/* Data Download */}
      <UnderlineSection title="Data Download">
        <Button mainShape={false} mainColor={false} bold>
          Request Download
        </Button>
      </UnderlineSection>
      {/* Privacy and security help */}
      <UnderlineSection title="Privacy and security help">
        <Button mainShape={false} mainColor={false} bold>
          Support
        </Button>
      </UnderlineSection>
      {/* Mentions */}
      <UnderlineSection title="Mentions" subtitle="Allow @mentions From">
        <div className={styles.radiosParent} style={{ margin: "0" }}>
          {["Everyone", "People You Follow", "No One"].map((value, i) => (
            <RadioInput
              key={value}
              id={`${value + i}`}
              value={value}
              // {...register(item.name)}
            />
          ))}
        </div>
      </UnderlineSection>
      {/* Posts */}
      <UnderlineSection title="Posts" subtitle="Likes and Views">
        <div style={{ margin: "2rem 0" }}>
          <div className={styles.flexSpaceBetween}>
            <div>Hide likes</div>
            <div>
              <SwitchButton id="hideLikes" variation="large" />
            </div>
          </div>
          <div>
            <p className={styles.smallP}>
              {`The number of likes on posts from other accounts will be hidden. You can hide the number of likes on your own posts by going to Advanced Settings before sharing. Learn more`}
            </p>
          </div>
        </div>
      </UnderlineSection>
      {/* Allow Tags From */}
      <UnderlineSection subtitle="Allow Tags From">
        <div className={styles.radiosParent} style={{ margin: "0" }}>
          {["Everyone", "People You Follow", "No One"].map((value, i) => (
            <RadioInput
              key={value}
              id={`${value + i}`}
              value={value}
              // {...register(item.name)}
            />
          ))}
        </div>
      </UnderlineSection>
      {/* Messages */}
      <UnderlineSection title="Messages">
        <Button mainShape={false} mainColor={false} bold>
          Manage message settings
        </Button>
      </UnderlineSection>
      {/* Hidden Words */}
      <UnderlineSection
        title="Hidden Words"
        subtitle="Offensive words and phrases"
      >
        <p className={styles.smallP}>
          {`Protect yourself from comments and message requests that contain
            offensive words, phrases or emojis.`}
        </p>
        <div style={{ margin: "2rem 0" }}>
          <div className={styles.flexSpaceBetween}>
            <div>Hide comments</div>
            <div>
              <SwitchButton id="hideComments" variation="large" />
            </div>
          </div>
          <div>
            <p className={styles.smallP}>
              {`Comments that may be offensive will be hidden in a separate section of your posts, reels, lives and IGTV.`}
            </p>
          </div>
        </div>
        <div style={{ margin: "2rem 0" }}>
          <div className={styles.flexSpaceBetween}>
            <div>Advanced comment filtering</div>
            <div>
              <SwitchButton id="advancedCommentFiltering" variation="large" />
            </div>
          </div>
          <div>
            <p className={styles.smallP}>
              {`Additional comments that may contain offensive words and phrases will be hidden. You can always review and unhide individual comments.`}
            </p>
          </div>
        </div>
        <div style={{ margin: "2rem 0" }}>
          <div className={styles.flexSpaceBetween}>
            <div>Hide message requests</div>
            <div>
              <SwitchButton id="hideMessageRequests" variation="large" />
            </div>
          </div>
          <div>
            <p className={styles.smallP}>
              {`Comments that may be offensive will be hidden in a separate section of your posts, reels, lives and IGTV.`}
            </p>
          </div>
        </div>
      </UnderlineSection>
    </div>
  );
}

function UnderlineSection({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className={styles.underlineSection}>
      {title ? <h2>{title}</h2> : null}
      {subtitle ? <div className={styles.subtitle}>{subtitle}</div> : null}
      {children}
    </div>
  );
}

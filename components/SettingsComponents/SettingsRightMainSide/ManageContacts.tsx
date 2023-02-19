import Button from "../../Button";
import styles from "../settings.module.scss";

export function ManageContacts() {
  return (
    <div className={styles.manageContacts}>
      <div style={{ marginBottom: "3rem" }}>Manage contacts</div>
      <div>
        <p>
          The people listed here are contacts you've uploaded to Instagram. To
          remove your synced contacts, tap Delete all. Your contacts will be
          re-uploaded the next time Instagram syncs your contacts unless you go
          to your device settings and turn off access to contacts.
        </p>
        <br />
        <p>
          Only you can see your contacts, but Instagram uses the info you've
          uploaded about your contacts to make friend suggestions for you and
          others and to provide a better experience for everyone.
        </p>
      </div>
      <div className={styles.divUnderline}>
        <div style={{ fontSize: "1.4rem", fontWeight: "500" }}>
          0 Synced contacts
        </div>
        <div>
          <Button
            mainShape={false}
            mainColor={false}
            size={2}
            style={{ fontWeight: "500" }}
            disabled
          >
            Delete All
          </Button>
        </div>
      </div>
      <div className={styles.divUnderline} style={{ paddingBottom: "3rem" }}>
        When you upload your contacts to Instagram, you'll see them here.
      </div>
      <Button disabled>Delete All</Button>
    </div>
  );
}

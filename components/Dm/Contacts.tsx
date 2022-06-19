import Link from "next/link";
import ContactCard from "./ContactCard";
import styles from "./Dm.module.scss";
import ArrowLeft from "../../public/leftArrow.svg";
import NewMessageIcon from "../../public/newMessage.svg";
const Contacts = () => {
  return (
    <div className={styles.contactsContainer}>
      <div className={`${styles.leftbarHeader} ${styles.shrinkHeader}`}>
        <div className={styles.arrowLeft}>
          <Link href="/">
            <a>
              <ArrowLeft />
            </a>
          </Link>
        </div>
        <div>simo_echaarani</div>
        <div>
          <NewMessageIcon />
        </div>
      </div>
      <div className={styles.contactList}>
        <div
          style={{
            fontWeight: "500",
            fontSize: "1.8rem",
            marginLeft: "2rem",
            padding: "1.5rem 0",
            color: "var(--txt-c-1)",
          }}
        >
          Messages
        </div>
        <ContactCard newMessage={true} />
        <ContactCard />
        <ContactCard />
        <ContactCard newMessage={true} />
        <ContactCard />
        <ContactCard newMessage={true} />
        <ContactCard />
        <ContactCard />
        <ContactCard newMessage={true} />
        <ContactCard newMessage={true} />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
      </div>
    </div>
  );
};

export default Contacts;

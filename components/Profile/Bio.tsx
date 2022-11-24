import styles from "./profile.module.scss";

export const Bio = () => {
  return (
    <div className={styles.bio} style={{ lineHeight: "2.3rem" }}>
      Front-end developer
      <br />
      Gm : echaaranimohamed@gmail.com
      <br />
      Fb : SiMo Echaarani
    </div>
  );
};

import Button from "../Button";
import styles from "./textarea.module.scss";

type props = {
  focus: boolean;
  children: string;
};

export const SendButton = ({ focus = false, children }: props) => {
  return (
    <div className={styles.sendButton}>
      <Button
        mainColor={false}
        mainShape={false}
        focus={focus}
        bold={true}
        size={2}
      >
        {children}
      </Button>
    </div>
  );
};

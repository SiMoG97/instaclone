import styles from "../popup.module.scss";
import LeftArrow from "../../../public/leftArrow.svg";
import Button from "../../Button";
import Cross from "../../../public/cross.svg";

export function NextPrevStepHeader({
  headerTitle,
  step,
  nextStep,
  prevStep,
  setShowDiscardPopup,
  setIsOpen,
}: NPSHProps) {
  const goBackHndler = () => {
    if (step === 1) {
      setShowDiscardPopup(() => true);
      return;
    }
    prevStep();
  };
  return (
    <div className={styles.nextPrevStepHeader}>
      {step === 0 ? (
        <span
          className={styles.crossX}
          style={{ display: "contents", cursor: "pointer" }}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <Cross />
        </span>
      ) : (
        <span
          // className={step === 0 ? styles.hideArrow : ""}
          style={{ display: "contents", cursor: "pointer" }}
          onClick={goBackHndler}
        >
          <LeftArrow className={styles.leftArrow} />
        </span>
      )}
      <span
        className={step === 0 ? styles.unvisible : ""}
        style={{ display: "contents", cursor: "pointer" }}
        onClick={goBackHndler}
      ></span>
      {headerTitle}
      <span onClick={nextStep} className={step === 0 ? styles.unvisible : ""}>
        <Button mainColor={false} mainShape={false} bold={true} size={2}>
          {step === 3 ? "Share" : "Next"}
        </Button>
      </span>
    </div>
  );
}
type NPSHProps = {
  headerTitle: string;
  step: number;
  prevStep: () => void;
  nextStep: () => void;
  setShowDiscardPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

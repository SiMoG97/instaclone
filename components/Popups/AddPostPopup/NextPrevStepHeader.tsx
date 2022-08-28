import styles from "../popup.module.scss";
import LeftArrow from "../../../public/leftArrow.svg";
import Button from "../../Button";

export function NextPrevStepHeader({
  headerTitle,
  step,
  nextStep,
  prevStep,
  setShowDiscardPopup,
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
      <span
        className={step === 0 ? styles.hideArrow : ""}
        style={{ display: "contents", cursor: "pointer" }}
        onClick={goBackHndler}
      >
        <LeftArrow />
      </span>
      {headerTitle}
      <span onClick={nextStep} className={step === 0 ? styles.hideArrow : ""}>
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
};

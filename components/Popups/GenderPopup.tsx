import PopupBody from "./PopupBody";
import PopupContainer from "./PopupContainer";
import styles from "./popup.module.scss";
import { RadioInput } from "../FormComponents/RadioInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WideButton } from "../AuthComponents";
import Button from "../Button";
import SmallPopup, { ButtonItem } from "./SmallPopup";
import { useState } from "react";

const schema = z.object({
  gender: z
    .enum(["Male", "Female", "LGBTQIA+", "Prefer not to say"])
    .optional(),
});
type FormType = z.infer<typeof schema>;

type GenderPopupType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export function GenderPopup({ isOpen, setIsOpen }: GenderPopupType) {
  const [showSmPopup, setShowSmPopup] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setFocus,
    control,
    formState: { errors, isValid },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const smPopupBtns: ButtonItem[] = [
    {
      text: "yes",
      method: () => {
        setShowSmPopup(() => false);
        setIsOpen(() => false);
      },
      type: "primary",
    },
    {
      text: "No",
      method: () => {
        setShowSmPopup(() => false);
      },
    },
  ];
  return (
    <>
      <PopupContainer
        callback={() => {
          console.log("clicked");
          setShowSmPopup(() => true);
        }}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      >
        <PopupBody
          popupHeader="Gender"
          setIsOpen={setIsOpen}
          className={styles.genderPopup}
        >
          <div className={styles.container}>
            <form
              onSubmit={handleSubmit((data) => {
                console.log(data);
              })}
            >
              {["Male", "Female", "LGBTQIA+", "Prefer not to say"].map(
                (item, i) => (
                  <div key={item} className={styles.radioContainer}>
                    <RadioInput
                      id={item}
                      value={item}
                      size="sm"
                      bold
                      {...register("gender")}
                    />
                  </div>
                )
              )}
              <WideButton hasIcon={false} type="submit" size="lg">
                Done
              </WideButton>
            </form>
          </div>
        </PopupBody>
      </PopupContainer>
      {showSmPopup ? (
        <SmallPopup
          titleOrPic="Unsaved changes"
          text="You have unsaved changes. Are you sure you want to cancel?"
          buttonList={smPopupBtns}
          popupCloser={setShowSmPopup}
        />
      ) : null}
    </>
  );
}

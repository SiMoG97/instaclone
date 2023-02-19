import Button from "../../Button";
import Input from "../../FormComponents/InputForm";
import { Textarea } from "../../FormComponents/Textarea";
import styles from "../settings.module.scss";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Checkbox from "../../FormComponents/Checkbox";
import { useState } from "react";
import { GenderPopup } from "../../Popups/GenderPopup";
import ProfilePic from "../../ProfilePic";
import { FileInput } from "../../FormComponents/FileInput";

const schema = z.object({
  name: z.string().max(50).optional(),
  username: z.string().max(50).optional(),
  bio: z.string().max(150).optional(),
  email: z.string().email().max(150).optional(),
  phoneNumber: z.string().max(150).optional(),
  gender: z
    .enum(["Male", "Female", "LGBTQIA+", "Prefer not to say"])
    .optional(),
  similarAccountSuggest: z.boolean().optional(),
});
export type FormType = z.infer<typeof schema>;

export function EditProfile() {
  const [genderPopupOpen, setGenderPopupOpen] = useState(false);
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
  console.log(new Intl.NumberFormat().format((watch("bio") || "").length));
  console.log(errors);
  return (
    <>
      <div>
        <div className={styles.changePPContainer}>
          <div className={styles.changePPLeft}>
            <label htmlFor="changeProfilePic">
              <ProfilePic
                src="/pp.jpg"
                size="size-4"
                style={{ marginLeft: "auto" }}
              />
              <FileInput
                id="changeProfilePic"
                onChange={() => {}}
                onlyImg
                multiple={false}
              />
            </label>
          </div>
          <div className={styles.changePPRight}>
            <div className={styles.changePPUserName}>godskiller404</div>
            <div>
              <label htmlFor="changeProfilePic">Change profile photo</label>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <InputLabelDesc
            id="name"
            Input={<Input id="name" placeholder="Name" {...register("name")} />}
            label="Name"
            description={`Help people discover your account by using the name you're known by: either your full name, nickname, or business name.`}
            descriptionTwo={`You can only change your name twice within 14 days.`}
          />
          <InputLabelDesc
            id="username"
            Input={
              <Input
                id="username"
                placeholder="username"
                {...register("username")}
              />
            }
            label="Username"
            description={`In most cases, you'll be able to change your username back to godskiller404 for another 14 days. Learn more`}
          />
          <InputLabelDesc
            id="Website"
            Input={<Input id="Website" placeholder="Website" disabled />}
            label="Website"
            description={`Editing your links is only available on mobile. Visit the Instagram app and edit your profile to change the websites in your bio.`}
          />
          <InputLabelDesc
            id="bio"
            Input={
              <Textarea
                id="bio"
                border
                resizable
                maxNumChars="150"
                numberOfChars={new Intl.NumberFormat().format(
                  (watch("bio") || "").length
                )}
                BottomStyle={{ padding: "0" }}
                TextareaCss={{ padding: "1rem" }}
                {...register("bio")}
              />
            }
            label="Bio"
          />
          <InputLabelDesc
            id=""
            Input={<></>}
            label=""
            descrTitle="Personal information"
            description={`Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.`}
          />
          <InputLabelDesc
            id="Email"
            Input={
              <Input id="Email" placeholder="Email" {...register("email")} />
            }
            label="Email"
          />
          <InputLabelDesc
            id="Phone Number"
            Input={
              <Input
                id="Phone Number"
                placeholder="Phone Number"
                {...register("email")}
              />
            }
            label="Phone Number"
          />
          <InputLabelDesc
            id="Gender"
            Input={
              <Input
                id="Gender"
                placeholder="Gender"
                // onClick={()=>{}}
                {...register("gender")}
                readonly
                onClickCB={() => {
                  setGenderPopupOpen(() => true);
                }}
              />
            }
            label="Gender"
          />
          <InputLabelDesc
            id="similarAccountSuggest"
            Input={
              <Checkbox
                id="similarAccountSuggest"
                {...register("similarAccountSuggest")}
                labelText="Include your account when recommending similar accounts people might want to follow."
              />
            }
            label="Similar account suggestions"
          />
          <InputLabelDesc
            id=""
            Input={
              <Button type="submit" style={{ margin: "2rem 0" }}>
                Submit
              </Button>
            }
            label=""
          />
          {/* <Button type="submit">Submit</Button> */}
        </form>
      </div>
      <>
        {genderPopupOpen ? (
          <GenderPopup
            isOpen={genderPopupOpen}
            setIsOpen={setGenderPopupOpen}
          />
        ) : null}
      </>
    </>
  );
}

type InputLabelDescType = {
  id: string;
  Input: React.ReactNode;
  label: string | React.ReactNode;
  descrTitle?: string;
  description?: string;
  descriptionTwo?: string;
  descriptionLast?: boolean;
  widthSize?: "normal" | "large";
};

export function InputLabelDesc({
  id,
  Input,
  label,
  descrTitle,
  description,
  descriptionTwo,
  widthSize = "normal",
}: InputLabelDescType) {
  return (
    <div className={styles.inputLableDescContainer}>
      <div className={styles.labelSide}>
        <label htmlFor={id}>{label}</label>
      </div>
      <div className={`${styles.inputsSide} ${styles[widthSize]}`}>
        <div>{Input}</div>
        {description ? (
          <Descriptions
            description={description}
            descrTitle={descrTitle}
            descriptionTwo={descriptionTwo}
          />
        ) : null}
      </div>
    </div>
  );
}

type DesctiptionType = {
  descrTitle?: string;
  description: string;
  descriptionTwo?: string;
};

function Descriptions({
  descrTitle,
  description,
  descriptionTwo,
}: DesctiptionType) {
  return (
    <div className={styles.descriptionContaienr}>
      {descrTitle ? <div className={styles.descTitle}>{descrTitle}</div> : null}
      <div className={styles.description}>{description}</div>
      {descriptionTwo ? (
        <div className={styles.description}>{descriptionTwo}</div>
      ) : null}
    </div>
  );
}

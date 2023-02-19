import { InputLabelDesc } from "./EditProfile";
import Input from "../../FormComponents/InputForm";
import Button from "../../Button";
import ProfilePic from "../../ProfilePic";
import styles from "../settings.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
  confirmNewPassword: z.string(),
});
export type FormType = z.infer<typeof schema>;

export function ChangePassword() {
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
  return (
    <div className={styles.changePasswordSection}>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <div className={styles.picUsername}>
          <div>
            <ProfilePic src="/pp.jpg" size="size-3" />
          </div>
          <div>SiMoG97</div>
        </div>
        <InputLabelDesc
          id="OldPassword"
          label="Old Password"
          Input={
            <Input
              type="password"
              color="dark"
              size="large"
              {...register("oldPassword")}
            />
          }
          widthSize="large"
        />
        <InputLabelDesc
          id="Newpassword"
          label="New password"
          Input={
            <Input
              type="password"
              color="dark"
              size="large"
              {...register("newPassword")}
            />
          }
          widthSize="large"
        />
        <InputLabelDesc
          id="ConfirmNewPassword"
          label="Confirm new password"
          Input={
            <Input
              type="password"
              color="dark"
              size="large"
              {...register("confirmNewPassword")}
            />
          }
          widthSize="large"
        />
        <InputLabelDesc
          id="changepass"
          label=""
          Input={
            <Button type="submit" disabled>
              Change password
            </Button>
          }
        />
        <InputLabelDesc
          id="forgetPass"
          label=""
          Input={
            <Button mainShape={false} mainColor={false}>
              Forget password
            </Button>
          }
        />
      </form>
    </div>
  );
}

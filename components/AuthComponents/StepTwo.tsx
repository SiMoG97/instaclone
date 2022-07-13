import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { FormContainer, WideButton } from "./";
import Button from "../Button";
import { SignupStepTwoTypes } from "../../utils/GlobalTypes";
import { SignupStepTwoSchema } from "../../utils/FormSchema";
import { MONTHS, hasThisManyDays } from "../../utils/date";
import { useSignupContext } from "../../context/SignupContext";
import styles from "./form.module.scss";
import { relative } from "path";
type StepTwoType = {
  setStep: Dispatch<SetStateAction<number>>;
};

export const StepTwo = ({ setStep }: StepTwoType) => {
  const [date, setDate] = useState(new Date().getFullYear());
  const [currMonth, setCurrMonth] = useState(new Date().getMonth());

  const { setStepTwoData } = useSignupContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupStepTwoTypes>({
    resolver: joiResolver(SignupStepTwoSchema),
    mode: "all",
  });
  console.log(errors, isValid, watch("year"));
  console.log(typeof new Date().getFullYear());
  return (
    <FormContainer>
      <img src="./birthdayicon.png" alt="cake with candles icon" />
      <div style={{ padding: "2rem 0", fontSize: "1.6rem", fontWeight: "600" }}>
        Add Your Birthday
      </div>
      <div>
        <p>
          This won't be a part of your public profile. <br />
          <a href="/" style={{ color: "var(--helper-primary)" }}>
            Why do I need to provide my birthday?
          </a>
        </p>
      </div>
      {/* form starts here */}
      <form
        method="post"
        onSubmit={handleSubmit(async (data) => {
          console.log(data);
          setStepTwoData(data);
        })}
      >
        <div
          style={{
            width: "100%",
            textAlign: "center",
            color: "var(--txt-c-1)",
          }}
        >
          {/* ----------- month ----------- */}

          <div style={{ margin: "1.5rem" }}>
            <select
              className={styles.select}
              {...register("month", { valueAsNumber: true })}
              onChange={(e) => {
                setCurrMonth(Number(e.target.value));
              }}
              defaultValue={currMonth}
            >
              {MONTHS.map((month, i) => (
                <option key={month} value={i}>
                  {month}
                </option>
              ))}
            </select>
            {/* ----------- day ----------- */}

            <select
              className={styles.select}
              {...register("day", { valueAsNumber: true })}
              defaultValue={new Date().getDate()}
            >
              {Array.from(
                Array(hasThisManyDays(date, String(MONTHS[currMonth]))).keys()
              ).map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            {/* ----------- year ----------- */}
            <select
              className={styles.select}
              {...register("year", { valueAsNumber: true })}
            >
              {Array.from(Array(120).keys()).map((_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
          <div
            className={`${styles.errorContainer} ${
              errors.year && styles.whenError
            }`}
          >
            {errors.year && (
              <p className={styles.selectError}>{errors.year.message}</p>
            )}
          </div>
          <div
            style={{
              color: "var(--txt-c-2)",
              fontSize: "1.2rem",
            }}
          >
            <p>You need to enter the year you were born</p>
            <br />
            <p>
              Use your own birthday, even if this account is for a business, a
              pet, or something else
            </p>
          </div>
        </div>
        <WideButton hasIcon={false} disabled={!isValid} type="submit">
          Next
        </WideButton>
      </form>

      {/* form ends here */}

      <div style={{ textAlign: "center" }}>
        <Button
          mainShape={false}
          mainColor={false}
          bold={true}
          style={{ marginTop: "1rem" }}
          onClick={() => {
            setStep((curr) => curr - 1);
          }}
        >
          Go back
        </Button>
      </div>
    </FormContainer>
  );
};

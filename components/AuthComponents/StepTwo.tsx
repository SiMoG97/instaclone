import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { FormContainer, WideButton } from "./";
import Button from "../Button";
import { MONTHS, hasThisManyDays } from "../../utils/date";
import styles from "./form.module.scss";
import { SignupStepOneTypes } from "../../utils/GlobalTypes";
type StepTwoType = {
  setStep: Dispatch<SetStateAction<number>>;
  stepOneData: SignupStepOneTypes;
};

export const StepTwo = ({ setStep, stepOneData }: StepTwoType) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [day, setDay] = useState(new Date().getDate());
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    const date = new Date();
    const allowedAge = new Date(
      date.getFullYear() - 6,
      date.getMonth(),
      date.getDate()
    );
    if (new Date(year, month, day) <= allowedAge) {
      setIsValid(true);
      return;
    }
    setIsValid(false);
  }, [day, month, year]);
  // ------- Rendering Months -------
  const renderMonths = () => {
    const date = new Date();
    const thisYear = date.getFullYear();
    const thisMonth = date.getMonth();

    if (year === thisYear) {
      return MONTHS.slice(0, thisMonth + 1).map((m, i) => (
        <option key={m} title={MONTHS[i]} value={i}>
          {m}
        </option>
      ));
    }
    return MONTHS.map((m, i) => (
      <option key={m} title={MONTHS[i]} value={i}>
        {m}
      </option>
    ));
  };

  // ------- Rendering Days -------
  const renderDays = () => {
    const date = new Date();
    const thisYear = date.getFullYear();
    const thisMonth = date.getMonth();
    if (year === thisYear && month === thisMonth) {
      return Array.from(Array(date.getDate()).keys()).map((_, i) => (
        <option key={i} value={i + 1}>
          {i + 1}
        </option>
      ));
    }
    return Array.from(
      Array(hasThisManyDays(year, String(MONTHS[month]))).keys()
    ).map((_, i) => (
      <option key={i} value={i + 1}>
        {i + 1}
      </option>
    ));
  };

  // ------- Rendering Years -------
  const renderYears = () =>
    Array.from(Array(120).keys()).map((_, i) => {
      const year = new Date().getFullYear() - i;
      return (
        <option key={year} value={year}>
          {year}
        </option>
      );
    });

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid) {
      console.log("its valid yaay, send here data");
      const user = {
        ...stepOneData,
        date_of_birth: `${year}-${month}-${day}`,
      };
      fetch("/api/users", {
        method: "POST",
        // body:user
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(user),
      });
    }
  };

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
        onSubmit={submitHandler}
        onKeyDown={(e) => {
          if (isValid) {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
              submitHandler(e);
            }
          }
        }}
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
              defaultValue={month}
              onChange={(e) => {
                setMonth(Number(e.target.value));
              }}
            >
              {renderMonths()}
            </select>
            {/* ----------- day ----------- */}

            <select
              className={styles.select}
              defaultValue={new Date().getDate()}
              onChange={(e) => {
                setDay(Number(e.target.value));
              }}
            >
              {renderDays()}
            </select>
            {/* ----------- year ----------- */}
            <select
              className={styles.select}
              onChange={(e) => {
                setYear(Number(e.target.value));
              }}
            >
              {renderYears()}
            </select>
          </div>
          <div
            className={`${styles.errorContainer} ${
              !isValid && styles.whenError
            }`}
          >
            {!isValid && (
              <p className={styles.selectError}>
                You're too young, you should be atleast six years.
              </p>
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

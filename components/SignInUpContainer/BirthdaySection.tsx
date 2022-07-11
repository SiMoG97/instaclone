import { options } from "joi";
import React, { useState } from "react";
import { MONTHS, hasThisManyDays } from "../../utils/date";

const BirthdaySection = () => {
  const [date, setDate] = useState(new Date().getFullYear());
  const [currMonth, setCurrMonth] = useState(new Date().getMonth());
  console.log(MONTHS[currMonth]);
  const thisMonth = MONTHS[currMonth];
  return (
    <>
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
      <div style={{ margin: "1.5rem" }}>
        <select
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
        <select defaultValue={new Date().getDate()}>
          {Array(hasThisManyDays(date, String(MONTHS[currMonth])))
            .fill("")
            .map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
        </select>
        <select
          onChange={(e) => {
            console.log(e.target.value);
            setDate(Number(e.target.value));
          }}
        >
          {Array(120)
            .fill(2)
            .map((_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
        </select>
      </div>
      <div style={{ color: "var(--txt-c-2)", fontSize: "1.2rem" }}>
        <p>You need to enter the year you were born</p>
        <br />
        <p>
          Use your own birthday, even if this account is for a business, a pet,
          or something else
        </p>
      </div>
    </>
  );
};

export default BirthdaySection;

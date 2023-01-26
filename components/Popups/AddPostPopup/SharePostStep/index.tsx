import React from "react";
import SidebarContainer from "../SidebarContainer";

type SharePostStepT = {
  step: number;
};

export function SharePostStep({ step }: SharePostStepT) {
  return (
    <>
      <div
        style={{
          width: "80rem",
          flexShrink: "0",
          justifyContent: "space-between",
        }}
      >
        SharePostStep
      </div>

      <SidebarContainer step={step} prevStep={5}>
        <h1>step 3 </h1>
      </SidebarContainer>
    </>
  );
}

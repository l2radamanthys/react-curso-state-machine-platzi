import React from "react";
import { useMachine } from "@xstate/react";
import { bookingMachine } from "../../Machines/bookingMachine";
import "./BaseLayout.css";
import { Nav } from "../../Components/Nav";
import { StepsLayout } from "../StepsLayout";

function BaseLayout() {
  const [state, send] = useMachine(bookingMachine);

  console.log("Machine", state.value);
  console.log("Machine Children", state.children);
  console.log("Context", state.context);

  return (
    <div className="BaseLayout">
      <Nav send={send} state={state} />
      <StepsLayout send={send} state={state} />
    </div>
  );
}

export { BaseLayout };

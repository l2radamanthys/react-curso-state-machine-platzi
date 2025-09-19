import React from "react";
import { useMachine } from "@xstate/react";
import { bookingMachine } from "../../Machines/bookingMachine";
import "./BaseLayout.css";
import { Nav } from "../../Components/Nav";
import { StepsLayout } from "../StepsLayout";

function BaseLayout() {
  const [state, send] = useMachine(bookingMachine);

  console.log("Machine", state);
  console.log("matches true", state.matches("initial"));
  console.log("matches false", state.matches("tickets"));
  console.log("can", state.can("finish"));

  return (
    <div className="BaseLayout">
      <Nav />
      <StepsLayout />
    </div>
  );
}

export { BaseLayout };

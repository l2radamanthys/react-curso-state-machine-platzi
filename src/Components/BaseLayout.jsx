import React from "react";
import { useMachine } from "@xstate/react";
import { bookingMachine } from "../Machines/bookingMachine";

function BaseLayout() {
  const [state, send] = useMachine(bookingMachine);

  console.log("Machine", state);
  console.log("matches true", state.matches("initial"));
  console.log("matches false", state.matches("tickets"));
  console.log("can", state.can("finish"));

  return <div>Hola</div>;
}

export { BaseLayout };

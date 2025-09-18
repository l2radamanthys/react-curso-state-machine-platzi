import React from "react";
import { useMachine } from "@xstate/react";
import { bookingMachine } from "../Machines/bookingMachine";

function BaseLayout() {
  const [state, send] = useMachine(bookingMachine);

  console.log("Machine", state);
  console.log("matches true", state.matches("initial"));

  return <div>Hola</div>;
}

export { BaseLayout };

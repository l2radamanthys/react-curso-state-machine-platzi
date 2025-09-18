import { createMachine } from "xstate";

const bookingMachine = createMachine({
  id: "buy plane tickets",
  initial: "initial",
  states: {
    initial: { on: { START: "search" } },
    search: {
      on: {
        CONTINUAR: "passengers",
        CANCELAR: "initial",
      },
    },
    passengers: {
      on: {
        DONE: "tickets",
        CANCELAR: "initial",
      },
    },
    tickets: {
      on: {
        FINISH: "initial",
      },
    },
  },
});

export { bookingMachine };

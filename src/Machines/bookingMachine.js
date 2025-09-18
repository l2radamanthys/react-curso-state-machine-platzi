import { createMachine } from "xstate";

const bookingMachine = createMachine({
  id: "buy plane tickets",
  initial: "inicial",
  states: {
    inicial: { on: { START: "search" } },
    search: {
      on: {
        CONTINUAR: "passengers",
        CANCELAR: "inicial",
      },
    },
    passengers: {
      on: {
        DONE: "tickets",
        CANCELAR: "inicial",
      },
    },
    tickets: {
      on: {
        FINISH: "inicial",
      },
    },
  },
});

export { bookingMachine };

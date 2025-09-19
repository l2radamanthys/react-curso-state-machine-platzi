import { createMachine } from "xstate";

const bookingMachine = createMachine(
  {
    id: "buy plane tickets",
    initial: "initial",
    states: {
      initial: {
        on: {
          START: {
            target: "search",
            actions: "logInitial",
          },
        },
      },
      search: {
        entry: "logSearchEntry",
        exit: "logSearchExit",
        on: {
          CONTINUE: "passengers",
          CANCEL: "initial",
        },
      },
      passengers: {
        on: {
          DONE: "tickets",
          CANCEL: "initial",
        },
      },
      tickets: {
        on: {
          FINISH: "initial",
        },
      },
    },
  },
  {
    actions: {
      logInitial: () => {
        console.log("Imprimir Inicio");
      },
      logSearchEntry: () => {
        console.log("Imprimir entrada a Search");
      },
      logSearchExit: () => {
        console.log("Imprimir salida de Search");
      },
    },
  }
);

export { bookingMachine };

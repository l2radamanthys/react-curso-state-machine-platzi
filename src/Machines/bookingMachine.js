import { createMachine, assign } from "xstate";

const bookingMachine = createMachine(
  {
    id: "buy plane tickets",
    initial: "initial",
    context: {
      passengers: [],
      selectedCountry: "",
    },
    states: {
      initial: {
        on: {
          START: {
            target: "search",
            // actions: "logInitial",
          },
        },
      },
      search: {
        // entry: "logSearchEntry",
        // exit: "logSearchExit",
        on: {
          CONTINUE: {
            target: "passengers",
            actions: assign({
              selectedCountry: ({ event }) => event.selectedCountry,
            }),
          },
          CANCEL: "initial",
        },
      },
      passengers: {
        on: {
          ADD: {
            target: "passengers",
            actions: assign(({ context, event }) =>
              context.passengers.push(event.newPassenger)
            ),
          },
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

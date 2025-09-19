import { createMachine, assign } from "xstate";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      on: {
        DONE: { target: "success" },
        ERROR: { target: "failure" },
      },
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
};

const bookingMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QCMCuBPABABwDYEMA7MTAFwEsBjAazFNgDpzDyL9cBiAZQBUBBAEo8A2gAYAuolDYA9rFbkZhKSAAeiAOwAmAMwMNARgAcGgKwAaEOkQ6ALADYGp0wE4jL00Z3efGgL5+lmhYeEQkFDR0jLBg+ABOlAAWHADCAPIAcjwAkhkAqgCiYpJIILLyFEoq6gjaeoYmFlaIRgZOAUEYOATEZFS09Awx8UmpfBkpBQAyxSrlClWlNRq2bQaiLjpmltYIWi6Ooq7unj6+HSDB3WF9kYPY+LAxhDBxsBx8ACKfs6Xzlcoloh7HoDBoDo0dohdLYGDo3LYtqYLldQr0IgNGA8nmAXmA3hxPpkihI5nIFoDQDUtKJRAwPDoDFomrstFpYS4NPZTPZmSiumjwv0ogxsc9Xu8UuNJjNSX9yQDqtDafTTIzmVCEHZTPotNzecjApcBT0hXdGBiohwAGK5bJcAASv2kCsUlLUiFstg0+lE6pZ0PZ9K5PL5F0IMggcBUqNNt0xZIqbqVCAAtAZNan7PyQnHLYNmAp2ImKSnnC59AGtaIffZEWyXAZ7M3m-4jbGbvnorEEokS4qgQgjNyGEZXEjNfsK0c3B4vGctjnrujhfdHuL8fB5UnFlTPRpNd4dTpTAZQ4bOrnO6uLTf+8nBzpmb7-ZPn979WGAkA */
    id: "buy plane tickets",
    initial: "initial",
    context: {
      passengers: [],
      selectedCountry: "",
    },
    states: {
      initial: {
        entry: assign(() => ({
          passengers: [],
          selectedCountry: "",
        })),
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
        ...fillCountries,
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

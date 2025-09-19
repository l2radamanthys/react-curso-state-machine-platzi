import { createMachine, createActor, assign, fromPromise } from "xstate";
import { fetchCountries } from "../Utils/api";

const fillCountriesMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMCWAbdBhA9gVwDsAXAJ1TgDp0cBDCVAqAYghwLAoYDccBrDmEVyFS5WAG0ADAF1EoAA45YqIqjZyQAD0QAmACwB2CgA4AzAFYAnHp0XbANgM7zAGhABPRMYCMFPZYDLSXtLA1NjG1MAXyi3NExhYjJKajoGZjASEhwSCnl0GiJkHIBbCkFE0TgpWSQQRWVVdTrtBG9jCmDnSUlTHQN2iIM9N08EHUtzCknTb2DzYe9TSVCYuIxsfCSxCmQaDDwSMCYAJQBRABUTgE0ajQaVNQINVp1jewp7FfC9UwMDcx6eyjXQrPzmZYRcw9OZBbwxWIgAg4CBwDTxTYiZLwOoPJrPFqIAC0E2mf38lkcb283nMOmBHmJHx6LMsy3ptIM9nsaxAGMq2KotHojHuSkezVArRsILakh0FAstNmYVMpnsOnhiP5WyqsAosDwAGMjXAcQpxfiXoggUYJvZjMZJMYJtYXSNGXKFU57HTffZvGFzI5eTqsTs9gcjmLGk9rQg9ImKPbHc7XXp3bLlkZevZE47DL9fdEEUA */
  id: "fillCountries",
  initial: "loading",
  context: {
    countries: [],
    error: "",
  },
  states: {
    loading: {
      invoke: {
        id: "getCountries",
        src: fromPromise(async () => {
          return await fetchCountries();
        }),
        onDone: {
          target: "success",
          actions: assign({
            countries: ({ event }) => event.output || [],
            error: () => null,
          }),
        },
        onError: {
          target: "failure",
          actions: assign({
            error: () => "Fallo el request.",
            countries: () => [],
          }),
        },
      },
    },
    success: {
      type: "final",
      output: ({ context }) => context,
    },
    failure: {
      on: {
        RETRY: "loading",
      },
    },
  },
});

const bookingMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QCMCuBPABABwDYEMA7MTAFwEsBjAazFNgDpzDyL9cBiAZQBUBBAEo8A2gAYAuolDYA9rFbkZhKSAAeiAMyiA7A20AmAGwaALAA4ArDv0BGCyYsAaEOkT79Fhu+3aLF7SY+Ghr6GgC+Yc5oWHhEJBQ0dIywYPgATpQAFhwQSmBMhABuMrQMAGbkuLgAwjKohKRp5HBikkggsvIUSirqCIbaogwWGmZm5lYGdhrOrggaFgCcDDYma+4mqxqLi2aGEVEYOATEZFS09Awp6VkcYGlpMmkMsaRlTwC25ZU1dQ1NLQkKk6Ch67T6AFpTCZZpoxgcQNFjnEzolLtcMtlqgB5AByPAAkriAKoAUVawLkoOU4MQJlGeiMpks1jsDlhCAhNhsQ029m0phsZkWwRMiwRSNipwSF2SqUxHGqfFx1VJABkKe0Qd0aaA+lZ9CsbIZFgLJrZ7E4XIgxis1iYNlsdvDIoijlL4ucki98LAUoQYGlYBw+AARUOa6RUnW9RAQkyiQ1mGz6bQ2baLVPjPwc0IMcz6RaGBPJ0SGQwWdMS90nT1oxjYX3+wPB0N48lArXRxS6tRxmymhiibap4uZ7TZq1zCyGIeGHnC0Sl8uV6sxWuo2U+v1gAP3YNKlXqyMdbtgvX98xDkfaMdZhxTzRX5MLxZLnkrtfI6Vey4ypIcAAYkSBJcAAEie2o9rGCDGoaabWAsrKWhywRzq+75lhWNgRK6hAyBAcAqJKG7-vQlJdNBtKcg4QzJqm6Y7PeObWpyA66IsbICpswrBBYX4epu3rMAo7AUdSMHckMvi+Ls5pso+CD6KINiMj4fgBEEIThK6JEomRco3Jk4kxtRay6HsJpmshwS5gyqzrPomz0s6+y6TW+m-g2Ta7i2JlURenKmBoDBMQmqzjpOuZmLo9KGEub7LhWAmkV5DAGf5559ggCZ6DyBhIVMKGsWhM4YUlq64UAA */
    id: "buy plane tickets",
    initial: "initial",
    context: {
      passengers: [],
      countries: [],
      selectedCountry: "",
      error: "",
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
          },
        },
      },
      search: {
        invoke: {
          id: "fillCountries",
          src: fromPromise(async ({ input }) => {
            // Crear actor del child machine
            const childActor = createActor(fillCountriesMachine);
            // Crear una promesa que se resuelve cuando el child termina
            return new Promise((resolve, reject) => {
              childActor.subscribe({
                next: (snapshot) => {
                  // Si llega a un estado final, resolver con el contexto en lugar del output
                  if (snapshot.status === "done") {
                    // Como output es undefined, usar el contexto directamente
                    const result = {
                      countries: snapshot.context.countries || [],
                      error: snapshot.context.error || null,
                    };
                    resolve(result);
                  }
                },
                error: (error) => {
                  console.error("Child error:", error);
                  reject(error);
                },
              });
              // Iniciar el child actor
              childActor.start();
            });
          }),
          onDone: {
            actions: assign({
              countries: ({ event }) => {
                if (event.output && event.output.countries) {
                  return event.output.countries;
                }
                return [];
              },
              error: ({ event }) => {
                if (event.output && event.output.error) {
                  return event.output.error;
                }
                return "";
              },
            }),
          },
          onError: {
            actions: assign({
              error: "Fallo el requests",
            }),
          },
        },
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
            actions: assign({
              passengers: ({ context, event }) => [
                ...context.passengers,
                event.newPassenger,
              ],
            }),
          },
          DONE: {
            target: "tickets",
            guard: ({ context }) => {
              console.log(context.passengers);
              return context.passengers?.length > 0;
            },
          },
          CANCEL: "initial",
        },
      },
      tickets: {
        after: {
          5000: {
            target: "initial",
          },
        },
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

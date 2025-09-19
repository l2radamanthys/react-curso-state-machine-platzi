import React from "react";
import "./Passengers.css";

function Passengers({ state, send }) {
  const [value, changeValue] = React.useState("");

  const onChangeInput = (e) => {
    changeValue(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    changeValue("");
  };

  const goToTickets = () => {
    send({ type: "DONE" });
  };

  return (
    <form onSubmit={submit} className="Passengers">
      <p className="Passengers-title title">
        Agrega a las personas que van a volar ✈️
      </p>
      <input
        id="name"
        name="name"
        type="text"
        className="bg-white p-2 my-2 w-full"
        placeholder="Escribe el nombre completo"
        required
        value={value}
        onChange={onChangeInput}
      />
      <div className="Passengers-buttons">
        <button className="Passengers-add button-secondary" type="submit">
          Agregar Pasajero
        </button>
        <button
          onClick={goToTickets}
          className="Passenger-pay button"
          type="button"
        >
          Ver mi ticket
        </button>
      </div>
    </form>
  );
}

export { Passengers };

import React from "react";
import "./Search.css";

function Search({ send }) {
  const [flight, setFlight] = React.useState("");

  const handleSelectChange = (event) => {
    setFlight(event.target.value);
  };

  const options = ["Mexico", "Venezuela", "Colombia"];
  const goToPassengers = () => {
    console.log(flight);
    send({ type: "CONTINUE", selectedCountry: flight });
  };

  return (
    <div className="Search">
      <p className="Search-title title">Busca tu destino</p>
      <select
        id="country"
        className="Search-select bg-white"
        value={flight}
        onChange={handleSelectChange}
      >
        <option value="" disabled defaultValue>
          Escoge un país
        </option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      <button
        onClick={goToPassengers}
        disabled={flight === ""}
        className="Search-continue button"
      >
        Continuar
      </button>
    </div>
  );
}

export { Search };

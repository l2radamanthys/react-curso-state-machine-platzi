import React from "react";
import "./StepsLayout.css";
import { Welcome } from "../../Components/Welcome";

function StepsLayout({ state, send }) {
  const renderContent = () => {
    return <Welcome />;
  };

  return <div className="StepsLayout">{renderContent()}</div>;
}

export { StepsLayout };

import React from "react";

function SupportOption({ icon, title, description, onClick }) {
  return (
    <button className="support-option" onClick={onClick}>
      <span>{icon}</span>

      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      
      </div>
    </button>
  );
}

export default SupportOption;

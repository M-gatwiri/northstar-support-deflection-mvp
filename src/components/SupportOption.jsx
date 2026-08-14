import React from "react";

function SupportOption({ icon, title, description, onClick }) {
  return (
    <button className="support-option" onClick={onClick}>
      <span className="support-icon">{icon}</span>

      <div className="support-option-content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <span className="support-arrow">→</span>
    </button>
  );
}

export default SupportOption;
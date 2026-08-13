import React from 'react'
function SupportOption({ icon, title, description }) {
  return (
    <button className="support-option">
      <span>{icon}</span>

      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </button>
  );
}

export default SupportOption;
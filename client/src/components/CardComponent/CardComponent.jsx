/** @format */

import React from "react";
import "./CardComponent.css";

const CardComponent = ({ title, pic }) => {
  return (
    <div className='card'>
      <div className='container'>
        <img
          height={55}
          width={55}
          src={pic}
          alt={title}
          style={{ borderRadius: "12px" }}
        />
        <div className='pad-5'>{title}</div>
      </div>
    </div>
  );
};

export default CardComponent;

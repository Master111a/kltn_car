/** @format */

import React from "react";
import PropTypes from "prop-types";
import CardComponent from "../CardComponent/CardComponent";
import carColorConfigs from "../Customizer/CarConfig";
import "./ListCards.css";

const ListCards = ({ selectType, selectedCarIndex }) => {
  if (!carColorConfigs[selectedCarIndex]?.colorConfigs) {
    return null;
  }

  return (
    <ul className='cards-list'>
      {carColorConfigs[selectedCarIndex].colorConfigs.map((item, index) => (
        <li key={index}>
          <div className='list-parts' onClick={() => selectType(index)}>
            <div className='card'>
              <div className='card-image'>
                <img src={item.image} alt={item.title} />
              </div>
              <div className='card-content'>
                <h3 className='card-title'>{item.title}</h3>
                <p className='card-price'>{item.price}</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

ListCards.propTypes = {
  selectType: PropTypes.func.isRequired,
  selectedCarIndex: PropTypes.number.isRequired,
};

export default ListCards;

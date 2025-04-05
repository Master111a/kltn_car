// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import "./ColorPalette.css";

// const ColorPalette = ({ config, changeColor }) => {
//   const { colors, types, title, modelPosition } = config;
//   const [selectedColorIndex, setSelectedColor] = useState(0);

//   return (
//     <div className="color-palette">
//       <div className="color-tab-title">{title}</div>
//       <div className="colors-tray">
//         <ul className="colors-list">
//           {colors.map((color, index) => (
//             <li
//               key={index}
//               className={`color-circle ${
//                 index === selectedColorIndex ? "selected" : ""
//               }`}
//               style={{ background: color }}
//               onClick={() => {
//                 setSelectedColor(index);
//                 changeColor(color, types, modelPosition);
//               }}
//             />
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// ColorPalette.propTypes = {
//   config: PropTypes.shape({
//     colors: PropTypes.arrayOf(PropTypes.string).isRequired,
//     types: PropTypes.arrayOf(PropTypes.string).isRequired,
//     title: PropTypes.string.isRequired,
//     modelPosition: PropTypes.string.isRequired,
//   }).isRequired,
//   changeColor: PropTypes.func.isRequired,
// };

// export default ColorPalette;

import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ColorPalette.css";

const ColorPalette = ({ config, changeColor }) => {
  const { colors, types, modelPosition } = config;
  const [selectedColorIndex, setSelectedColor] = useState(0);

  return (
    <div className="color-palette">
      <div className="colors-tray">
        <div className="contain-color">
          <ul className="colors-list">
            {colors.map((color, index) => (
              <span
                key={index}
                className={`color-circle ${
                  index === selectedColorIndex ? "selected" : ""
                }`}
                style={{ background: color }}
                onClick={() => {
                  setSelectedColor(index);
                  changeColor(color, types, modelPosition);
                }}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

ColorPalette.propTypes = {
  config: PropTypes.shape({
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    modelPosition: PropTypes.string.isRequired,
  }).isRequired,
  changeColor: PropTypes.func.isRequired,
};

export default ColorPalette;

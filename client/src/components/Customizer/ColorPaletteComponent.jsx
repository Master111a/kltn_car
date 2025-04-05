import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import ColorPalette from "../ColorPalette/ColorPalette";
import colorConfig from "./CarConfig";
import { changeColor } from "./customizeUtils";

const ColorPaletteComponent = ({
  selectedCarIndex,
  selectedIndex,
  modelRef,
}) => {
  const [generatedColorConfig] = useState([]);

  const currentColorConfig = useMemo(() => {
    return generatedColorConfig.length
      ? generatedColorConfig
      : colorConfig[selectedCarIndex].colorConfigs;
  }, [generatedColorConfig, selectedCarIndex]);

  if (selectedIndex < 0 || selectedIndex >= currentColorConfig.length) {
    return null;
  }

  const config = currentColorConfig[selectedIndex];

  return (
    <ColorPalette
      indexString={`${selectedIndex + 1}/${currentColorConfig.length}`}
      config={config}
      changeColor={(color, types) => changeColor(color, types, modelRef)}
    />
  );
};

ColorPaletteComponent.propTypes = {
  selectedCarIndex: PropTypes.number.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  modelRef: PropTypes.object.isRequired,
};

export default ColorPaletteComponent;

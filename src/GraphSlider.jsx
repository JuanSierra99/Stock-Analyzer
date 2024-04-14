import { useState } from "react";
import "./GraphSlider.css";
export const GraphSlider = () => {
  const [sliderValue, setSliderValue] = useState(0);
  return (
    <div className="slider-container">
      <input
        type="range"
        min={10}
        max={100}
        value={sliderValue}
        onChange={(e) => setSliderValue(e.target.value)}
        className="slider"
      ></input>
    </div>
  );
};

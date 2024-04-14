import React, { useState, useEffect } from "react";
import "./AnalogClock.css";

const AnalogClock = ({ text, secondHandColor }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hourDeg = ((time.getHours() % 12) + time.getMinutes() / 60) * 30;
  const minuteDeg = (time.getMinutes() + time.getSeconds() / 60) * 6;
  const secondDeg = time.getSeconds() * 6;

  const hourStyle = {
    transform: `rotate(${hourDeg}deg)`,
  };

  const minuteStyle = {
    transform: `rotate(${minuteDeg}deg)`,
  };

  const secondStyle = {
    transform: `rotate(${secondDeg}deg)`,
  };

  return (
    <div className="analog-clock">
      <h1 className="clock-text">{text}</h1>
      <div className="hand hour-hand" style={hourStyle}></div>
      <div className="hand minute-hand" style={minuteStyle}></div>
      <div className="hand second-hand" style={secondStyle}></div>
      <div className="clock-center"></div>
    </div>
  );
};

export default AnalogClock;

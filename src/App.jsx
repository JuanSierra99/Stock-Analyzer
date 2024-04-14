import { useState } from "react";

import QuarterlyDataGraph from "./QuarterlyDataGraph";
import TopBar from "./TopBar";
import { Sidebar } from "./Sidebar";
import AnalogClock from "./AnalogClock";
import "./App.css";

function App() {
  const [sidebarIsMini, setSidebarIsMini] = useState(false);
  const [searchTickerValue, setSearchTickerValue] = useState("IBM");

  const toggleSidebar = () => {
    setSidebarIsMini(!sidebarIsMini);
  };
  return (
    <div id="root">
      <section
        className={`sidebar-section ${
          sidebarIsMini ? "hide-sidebar-section" : ""
        }`}
      >
        <Sidebar
          buttonFunction={toggleSidebar}
          simplifiedSidebar={sidebarIsMini}
        />
      </section>
      <section
        className={`main-page-section ${
          sidebarIsMini ? "extended-main-page-section" : ""
        }`}
      >
        <TopBar
          searchTickerValue={searchTickerValue}
          setSearchTickerValue={setSearchTickerValue}
        />
        <QuarterlyDataGraph searchTickerValue={searchTickerValue} />
        <section className="content-section">
          {" "}
          <div className="content-box-left">
            <AnalogClock text={"NYSE"}></AnalogClock>
          </div>
          <div className="content-box-right">
            <AnalogClock text={"NASDAQ"}></AnalogClock>
          </div>
        </section>
      </section>
    </div>
  );
}

export default App;

import { useState } from "react";
import QuarterlyDataGraph from "./QuarterlyDataGraph";
import TopBar from "./TopBar";
import { Sidebar } from "./Sidebar";
import "./App.css";
function App() {
  const [sidebarIsMini, setSidebarIsMini] = useState(false);
  const toggleSidebar = () => {
    setSidebarIsMini(!sidebarIsMini);
  };
  return (
    <div id="root">
      <div
        className={`sidebar-section ${
          sidebarIsMini ? "hide-sidebar-section" : ""
        }`}
      >
        <Sidebar
          buttonFunction={toggleSidebar}
          simplifiedSidebar={sidebarIsMini}
        />
      </div>
      <div
        className={`main-page-section ${
          sidebarIsMini ? "extended-main-page-section" : ""
        }`}
      >
        <TopBar />
        <QuarterlyDataGraph />
      </div>
    </div>
  );
}

export default App;

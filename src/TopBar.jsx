import { useState } from "react";
import "./TopBar.css";

const Topbar = ({ searchTickerValue, setSearchTickerValue }) => {
  const [searchInput, setSearchInput] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch stock data based on the entered symbol
      setSearchTickerValue(searchInput);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };
  return (
    <div className="topbar-container">
      <h1 className={"topbar-title"}>Dashboard</h1>
      <div className="topbar-right">
        <form onSubmit={handleSubmit} className="search-stock-form">
          <button type="submit" className="search-button">
            <img src="/Svgs/search.svg" style={{ width: "15px" }} />
          </button>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="TICKER"
            className="search-stocks"
          ></input>
        </form>

        <a>
          <img
            src="Svgs/open-book.svg"
            alt="Docs"
            style={{ height: "1.5rem" }}
          />
        </a>
        <a>
          {" "}
          <img
            src="Svgs/feedback.svg"
            alt="Feedback"
            style={{ height: "1.5rem" }}
          />
        </a>
      </div>
    </div>
  );
};

export default Topbar;

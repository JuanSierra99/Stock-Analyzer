import "./TopBar.css";
const Topbar = () => {
  return (
    <div className="topbar-container">
      <h1 className={"topbar-title"}>Dashboard</h1>
      <div className="topbar-right">
        <input
          type="text"
          placeholder="Search Companies"
          className="search-stocks"
        ></input>
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

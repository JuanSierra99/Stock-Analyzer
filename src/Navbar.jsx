import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar-container">
      <h1 className={"navbar-title"}>Dashboard</h1>
      <div className="navbar-right">
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

export default Navbar;

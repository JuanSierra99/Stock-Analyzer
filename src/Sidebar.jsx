import "./Sidebar.css";
export const Sidebar = ({ buttonFunction, simplifiedSidebar }) => {
  return (
    <div className={`sidebar-container`}>
      <nav
        className={`${
          simplifiedSidebar
            ? "simplified-sidebar-upper-section"
            : "sidebar-upper-section"
        }`}
      >
        <h4 className="sidebar-header">
          {simplifiedSidebar ? "VG" : "Value Glance"}
          <button className="sidebar-button" onClick={buttonFunction}>
            <img src="/Svgs/sidebar-toggle.svg" alt="sidebar-toggle" />
          </button>
        </h4>
        <a href="#">
          <img
            src="/Svgs/dashboard.svg"
            style={{ height: "1rem" }}
            alt="dashboard"
          />{" "}
          {!simplifiedSidebar && "Dashboard"}
        </a>
        <a href="#">
          <img
            src="/Svgs/watchlist.svg"
            style={{ height: "1rem" }}
            alt="watchlist"
          ></img>
          {!simplifiedSidebar && "Watchlist"}
        </a>
        <a href="#">
          <img src="/Svgs/stock.svg" style={{ height: "1rem" }} alt="stocks" />
          {!simplifiedSidebar && "Stocks"}
        </a>
        <a href="#">
          <img src="/Svgs/filter.svg" style={{ height: "1rem" }} alt="filter" />{" "}
          {!simplifiedSidebar && "Filter"}
        </a>
      </nav>
      {!simplifiedSidebar && (
        <nav className="sidebar-bottom">
          <a href="#">Help</a>
          <a href="#">Account</a>
        </nav>
      )}
    </div>
  );
};

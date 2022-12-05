import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const collapseSidebar = () => {
    const sidebar = document.getElementById("sidebar-test-id");
    const body = document.getElementsByTagName("body");
    // setCollapsed(sidebar.classList.contains("collapsed"));
    if (sidebar.classList.contains("collapsed")) {
      body[0].classList.remove("sidebar-mini");
      sidebar.classList.remove("collapsed");
      return;
    }
    console.log(body[0]);
    body[0].classList.add("sidebar-mini");
    sidebar.classList.add("collapsed");
  };
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="pushmenu"
            onClick={() => collapseSidebar()}
            role="button"
          >
            <i className="fas fa-bars"></i>
          </a>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            className="nav-link"
            // href="https://demo-v2.pipingmastersoftware.com/logout"
            // onclick="event.preventDefault(); document.getElementById('logout-form').submit();"
            role="button"
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;

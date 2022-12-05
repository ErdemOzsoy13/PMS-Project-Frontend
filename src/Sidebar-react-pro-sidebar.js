import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { RiBarChart2Fill, RiShoppingCartFill } from "react-icons/ri";
import { ImBook } from "react-icons/im";
import { ImTable2 } from "react-icons/im";
import { AiFillCalendar } from "react-icons/ai";
import { FaCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Layout() {
  // const { collapseSidebar } = useProSidebar();
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState(false);
  const [win_loc_path, setwin_loc_path] = useState("/");

  const collapseSidebar = () => {
    const sidebar = document.getElementById("sidebar-test-id");
    setCollapsed(sidebar.classList.contains("collapsed"));
    if (sidebar.classList.contains("collapsed")) {
      sidebar.classList.remove("collapsed");
      return;
    }
    sidebar.classList.add("collapsed");
  };
  const location = useLocation();

  return (
    <aside id="sidebar-test-id" className="main-sidebar box-shadow">
      <a href="#" className="brand-link text-center">
        <span className="brand-text font-weight-light">
          <strong>PMS PROJECT</strong>
        </span>
      </a>
      <div className="user-panel mt-3 pl-3 d-flex">
        <div className="image mb-3">
          <i className="fa fa-user fa-3x img-circle"></i>
        </div>
        <div className="info">
          <a href="#" className="d-block">
            Erdoğan Seyhan
            <p style={{ fontSize: "14px", textAlign: "center" }}>
              (quality_control)
            </p>
          </a>
        </div>
      </div>
      <div className="inner-sidebar-test-id">
        <Menu
          renderMenuItemStyles={({ level, disabled, active }) => ({
            ".expand-icon": {
              visibility: !collapsed ? "visible" : "hidden",
              marginRight: "0.5rem",
            },
            ".menu-anchor": {
              backgroundColor: active
                ? level === 0
                  ? "#0d6efd"
                  : "grey"
                : "initial",
              color:
                level === 0
                  ? active
                    ? "white"
                    : "#212529"
                  : active
                  ? "white"
                  : "grey",
              borderRadius: "0.375rem",
              padding: "0px 0.6rem",
              margin: "0.1rem 0.6rem",
            },
            ":not(.active) .menu-anchor:hover": {
              backgroundColor: "rgba(0,0,0,.1)",
            },
          })}
          style={{ marginTop: "0.5rem" }}
        >
          <SubMenu
            active={window.location.pathname === "/chart"}
            label="Charts"
            icon={<RiBarChart2Fill />}
          >
            <MenuItem
              active={window.location.pathname === "/chart"}
              icon={<FaCircle />}
              routerLink={<Link to="/chart" />}
            >
              Pie charts
            </MenuItem>
            <MenuItem icon={<FaCircle />}> Line charts </MenuItem>
          </SubMenu>
          <MenuItem
            active={window.location.pathname === "/documentation"}
            icon={<ImBook />}
            routerLink={<Link to="/documentation" />}
          >
            Documentation
          </MenuItem>
          <MenuItem
            active={window.location.pathname === "/"}
            icon={<ImTable2 />}
            routerLink={<Link to="/" />}
          >
            Datatable
          </MenuItem>
          <MenuItem icon={<RiShoppingCartFill />}> E-commerce</MenuItem>
        </Menu>
      </div>
    </aside>
  );
}

export default Layout;

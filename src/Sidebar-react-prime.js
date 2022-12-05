import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import PanelMenuDemo from "./SidebarMenu";

const SidebarDemo = () => {
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const [visibleTop, setVisibleTop] = useState(false);
  const [visibleBottom, setVisibleBottom] = useState(false);
  const [visibleFullScreen, setVisibleFullScreen] = useState(false);
  const [visibleCustomToolbar, setVisibleCustomToolbar] = useState(true);

  const customIcons = (
    <React.Fragment>
      <button className="p-sidebar-icon p-link mr-1">
        <span className="pi pi-print" />
      </button>
      <button className="p-sidebar-icon p-link mr-1">
        <span className="pi pi-arrow-right" />
      </button>
    </React.Fragment>
  );

  return (
    <div>
      <div className="card">
        <Sidebar
          visible={visibleCustomToolbar}
          onHide={() => setVisibleCustomToolbar(false)}
          icons={customIcons}
        >
          <h3>Sidebar with custom icons</h3>
          <PanelMenuDemo />
        </Sidebar>

        <Button
          icon="pi pi-plus"
          onClick={() => setVisibleCustomToolbar(true)}
        />
      </div>
    </div>
  );
};

export default SidebarDemo;

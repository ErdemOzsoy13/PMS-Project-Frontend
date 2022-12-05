import logo from "./logo.svg";
import "./App.css";
import Layout from "./Sidebar-react-pro-sidebar";
import { ProSidebarProvider } from "react-pro-sidebar";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Charts from "./screens/Charts";
import Documentation from "./screens/Documentaion";
import Header from "./Header";
import EditorDatatable from "./screens/EditorDatatable";

function App() {
  return (
    <div className="wrapper">
      <ProSidebarProvider>
        <Header />
        <Layout />
      </ProSidebarProvider>
      <div className="content-wrapper">
        {/* <button id="toastme" style={{ marginLeft: "300px" }}>
          Toast Me
        </button> */}
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <div className="container-fluid pt-4">
                  <div className="row">
                    <div className="col-12">
                      <div className="card">
                        <div className="card-body">
                          <EditorDatatable />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            }
          />
          <Route path="/chart" element={<Charts />} />
          <Route path="/documentation" element={<Documentation />} />
        </Routes>
      </div>
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: "4",
        }}
      >
        <div
          className="toast toast1"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-body">Weldlog Updating...</div>
        </div>

        <div
          className="toast toast2"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-body">Weldlog Updated</div>
        </div>
      </div>
    </div>
  );
}

export default App;

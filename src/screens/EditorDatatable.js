import React, { Component } from "react";
const $ = require("jquery");

class EditorDatatable extends Component {
  componentWillMount() {
    var list = [
      "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js",
      // "https://code.jquery.com/jquery-3.5.1.js",
      // "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.5.3/js/bootstrap.min.js",
      // "https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.9.2/umd/popper.min.js",
      "https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js",
      "https://cdn.datatables.net/v/dt/jqc-1.12.4/dt-1.12.1/b-2.2.3/sl-1.4.0/datatables.min.js",
      "http://localhost:3000/js/dataTables.editor.js",
      "https://cdn.datatables.net/datetime/1.1.2/js/dataTables.dateTime.min.js",
      "https://cdn.datatables.net/keytable/2.7.0/js/dataTables.keyTable.min.js",
      "https://cdn.datatables.net/buttons/2.2.3/js/dataTables.buttons.min.js",
      "https://cdn.datatables.net/buttons/2.2.3/js/buttons.colVis.min.js",
      "http://localhost:3000/index_datatable.js",
    ];
    for (let i = 0; i < list.length; i++) {
      importScript(list[i]);
    }
  }

  // componentWillUnmount() {
  //   $("#myTable").DataTable.destroy(true);
  // }

  render() {
    return (
      <table
        id="myTable"
        className="table table-striped table-hover table-bordered"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th className="dt-center">#</th>
            <th className="dt-center">#</th>
            <th>line</th>
            <th>isometry</th>
            <th>spool</th>
            <th>joint</th>
            <th>dia</th>
            <th>mat1</th>
            <th>p1</th>
            <th>mat2</th>
            <th>p2</th>
            <th>fitupdate</th>
            <th>fitupresult</th>
            <th>weldclass</th>
            <th>pwht</th>
            <th>wps</th>
            <th>location</th>
            <th>weldtype</th>
            <th>welder</th>
            <th>vtdate</th>
            <th>vtreport</th>
            <th>pwhtdate</th>
            <th>pwhtreport</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>
    );
  }
}
export default EditorDatatable;

const importScript = (resourceUrl) => {
  const script = document.createElement("script");
  script.src = resourceUrl;
  script.async = true;
  document.head.appendChild(script);
};

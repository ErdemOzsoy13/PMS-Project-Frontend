import React, { Component } from "react";

class Charts extends Component {
  componentWillMount() {
    var list = [
      "https://cdn.amcharts.com/lib/5/themes/Animated.js",
      "https://cdn.amcharts.com/lib/5/xy.js",
      "https://cdn.amcharts.com/lib/5/index.js",
      "http://localhost:3000/index_chart.js",
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
      <div className="row align-items-center mr-5 vw-80 vh-100 overflow-auto">
        <div className="col-8 mx-auto">
          <div id="chartdiv"></div>
        </div>
      </div>
    );
  }
}

export default Charts;

const importScript = (resourceUrl) => {
  const script = document.createElement("script");
  script.src = resourceUrl;
  script.async = true;
  document.head.appendChild(script);
};

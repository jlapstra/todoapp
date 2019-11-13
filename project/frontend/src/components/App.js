import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import MainApp from "./MainApp";

const App = () => (
  <DataProvider endpoint="api/todolists/" 
                render={data => <MainApp data={data} />} />
);


const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;

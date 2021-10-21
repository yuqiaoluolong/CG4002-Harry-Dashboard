import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Dashboard from "./components/dashboard.component";
import Dancer1 from "./components/dancer1.component";
import Dancer2 from "./components/dancer2.component";
import Dancer3 from "./components/dancer3.component";
import Survey from "./components/survey.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={Dashboard} />
        <Route path="/dancer1" component={Dancer1} />
        <Route path="/dancer2" component={Dancer2} />
        <Route path="/dancer3" component={Dancer3} />
        <Route path="/survey" component={Survey} />
      </div>
    </Router>
  );
}

export default App;
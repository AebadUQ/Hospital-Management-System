import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Doctor from './components/Doctor'
import Patient from "./components/Patient";
import Drug from "./components/Drug" ;
import Room from './components/Room';
import Navbar from "./components/navbar";
import Bill from './components/Bill'
import Lab from "./components/Labreport";
import Home from "./components/Home/App";
import "./styles.css";
// import {createStore} from 'redux';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div>
          <Switch>
            <Route exact path="/"  component={Home} />
            <Route path="/Patient"  component={Patient} />
            <Route path="/Doctor" component={Doctor} />
            <Route path="/Drug" component={Drug} />
            <Route path="/Room" component={Room} />
            <Route path="/Bills" component={Bill} />
            <Route path="/Lab" component={Lab} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

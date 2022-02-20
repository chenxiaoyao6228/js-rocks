import "./styles.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RenderProps from "./patterns/RenderProps";
import CompoundComponent from "./patterns/CompoundComponent";
import ControlProps from "./patterns/ControlProps";
import PropsCollection from "./patterns/PropsCollection";
import StateReducer from "./patterns/StateReducer";
import Masonry from "./Masonry";
import BarrelLayout from "./BarrelLayout";
import VirtualList from "./VirtualList";

const routes = [
  ["Masonry", Masonry],
  ["VirtualList", VirtualList],
  ["patterns/RenderProps", RenderProps],
  ["patterns/CompoundComponent", CompoundComponent],
  ["patterns/PropsCollection", PropsCollection],
  ["patterns/StateReducer", StateReducer],
  ["patterns/ControlProps", ControlProps],
];

export default function App() {
  return (
    <Router>
      <div className="app">
        <ul className="sider">
          {routes.map(([label]) => (
            <li>
              <Link to={`/${label.replace(" ", "/")}`}>{label}</Link>
            </li>
          ))}
        </ul>
        <div id="pageContainer" className="page-container">
          <Switch>
            {routes.map(([label, Component, additionalRoute = ""]) => (
              <Route
                key={label}
                path={`/${label.replace(" ", "/")}${additionalRoute}`}
              >
                <Component />
              </Route>
            ))}
            <Route path="/" exact>
              <h1>Welcome!</h1>
            </Route>
            <Route path="*">Page not found.</Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

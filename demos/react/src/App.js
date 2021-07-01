import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";
import RenderProps from "./RenderProps";
import CompoundComponent from "./CompoundComponent";
import ControlProps from "./ControlProps";
import PropsCollection from "./PropsCollection";
import StateReducer from "./StateReducer";
import Masonry from "./Masonry";
import BarrelLayout from "./BarrelLayout";
import VirtualList from "./VirtualList";
import LazyLoad from "./LazyLoad";

const routes = [
  ["BarrelLayout", BarrelLayout],
  ["LazyLoad", LazyLoad],
  ["VirtualList", VirtualList],
  ["Masonry", Masonry],
  ["RenderProps", RenderProps],
  ["CompoundComponent", CompoundComponent],
  ["PropsCollection", PropsCollection],
  ["StateReducer", StateReducer],
  ["ControlProps", ControlProps],
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

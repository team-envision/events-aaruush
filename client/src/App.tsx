import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import { Home } from "./modules";
import { Constants } from "./constants";
import { Navbar } from "./shared/components";

function App() {
  const [isOrg, setIsOrg] = useState(false);

  useEffect(() => {
    setIsOrg(
      window.location.host.split(".")[0] === Constants.ORG_SUBDOMAIN
        ? true
        : false
    );
  }, []);

  return (
    <div className="App">
      <Router>
        {isOrg ? (
          <Route component={AdminRoutes} />
        ) : (
          <Route component={CommonRoutes} />
        )}
      </Router>
    </div>
  );
}

export const AdminRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={Navbar} />
    </Switch>
  );
};

export const CommonRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={Home} />
    </Switch>
  );
};

export default App;

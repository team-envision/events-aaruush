import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.scss";
import Home from "./components/Index/Hero";
import { Constants } from "./constants";

function App() {
  const [isOrg, setIsOrg] = useState(false);

  useEffect(() => {
    setIsOrg(
      window.location.host.split(".")[0] === Constants.ORG_SUBDOMAIN && true
    );
  }, []);

  const AdminRoutes = () => {
    return (
      <Switch>
        <Route path="/" exact>
          hi, this is the admin route
        </Route>
      </Switch>
    );
  };

  const CommonRoutes = () => {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    );
  };

  return (
    <div className="App">
      {isOrg ? (
        <Route component={AdminRoutes} />
      ) : (
        <Route component={CommonRoutes} />
      )}
    </div>
  );
}

export default App;

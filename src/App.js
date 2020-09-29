import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import LoginForm from "./features/user/LoginForm";
import SignupForm from "./features/user/SignupForm";
import Feed from "./features/tweet/Feed";
import PrivateRoute from "./features/user/PrivateRoute";
import { useSelector } from "react-redux";
import Logout from "./features/user/Logout";

function App() {
  const username = useSelector((state) => state.user.username);

  return (
    <BrowserRouter>
      {username && (
        <div>
          {username} [<Link to="/logout">Salir</Link>]
        </div>
      )}

      <Switch>
        {/* Si no pongo este switch va a cargar todos los componentes que matcheen ... */}
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
        <PrivateRoute exact path="/" component={Feed} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/login" />
        {/* Si no pongo switch siempre va a llegar acá */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;

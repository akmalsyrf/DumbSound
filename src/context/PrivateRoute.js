import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "./UserContext";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(UserContext);

  return (
    <>
      <Route {...rest} render={(props) => (state.isLogin ? <Component {...props} /> : <Redirect to="/home" />)} />
    </>
  );
};

export const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
  const [state] = useContext(UserContext);

  return (
    <>
      <Route {...rest} render={(props) => (state.isLogin ? Number(state.user.status) === 1 ? <Component {...props} /> : <Redirect to="/home" /> : <Redirect to="/home" />)} />
    </>
  );
};

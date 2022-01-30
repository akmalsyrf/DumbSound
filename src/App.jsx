import { useContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavBar from "./components/NavBar";

//pages
import LandingPage from "./pages/LandingPage";
import Pay from "./pages/Pay";
import ListTrans from "./pages/ListTrans";
import AddArtis from "./pages/AddArtis";
import AddMusic from "./pages/AddMusic";

//context
import { PrivateRoute, PrivateRouteAdmin } from "./context/PrivateRoute";
import { UserContext } from "./context/UserContext";

import { API, setAuthToken } from "./config/API";

//check token in localstorage
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const history = useHistory();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    // Redirect is admin
    if (state.isLogin === false) {
      history.push("/home");
    } else {
      if (Number(state.user.status) !== 0) {
        history.push("/list-transfer");
      } else {
        history.push("/home");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <NavBar />
      <Switch>
        <div className="bg-dark">
          <Route exact path="/home" component={LandingPage} />
          <PrivateRoute exact path="/pay" component={Pay} />
          <PrivateRouteAdmin exact path="/list-transfer" component={ListTrans} />
          <PrivateRouteAdmin exact path="/add-artist" component={AddArtis} />
          <PrivateRouteAdmin exact path="/add-music" component={AddMusic} />
        </div>
      </Switch>
    </>
  );
}

export default App;

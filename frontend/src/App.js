import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import BusinessBrowser from "./components/BusinessBrowser"
import HomePage from "./components/HomePage";
import CreateBusinessForm from "./components/CreateBusinessForm";
import EditBusinessForm from "./components/EditBusinessForm";
import ReviewBrowser from "./components/ReviewBrowser";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/createBusiness">
            <CreateBusinessForm />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path={["/business", "/business/:businessId"]}>
            <BusinessBrowser />
          </Route>
          <Route exact path={["/edit/business/:businessId"]}>
            <EditBusinessForm />
          </Route>
          <Route exact path={["/review/business/:businessId"]}>
            <ReviewBrowser />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import BusinessBrowser from "./components/BusinessBrowser"
import HomePage from "./components/HomePage";
import CreateBusinessForm from "./components/CreateBusinessForm";
import EditBusinessForm from "./components/EditBusinessForm";
import ReviewBrowser from "./components/ReviewBrowser";
import ReviewDetail from "./components/ReviewDetail"
import ReviewAllBrowser from "./components/ReviewAllBroser";
import NotFound from "./components/NotFound";
//import BusinessDetail from "./components/BusinessDetail";
import './index.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="myheader">
        <h5>Developed by:</h5> <h4>Cesar Solano</h4>
        <a href="https://www.linkedin.com/in/cesar-solano-320211230/" target="_blank">linkedIn </a>
        <a href="https://github.com/171cas" target="_blank">GitHub </a>
      </div>
      <div className="page-container">
        <h1>Rate This Job!</h1>
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
            <Route exact path="/review/business/:businessId">
              <ReviewBrowser />
            </Route>
            <Route exact path={["/review/:reviewId"]}>
              <ReviewDetail />
            </Route>
            <Route exact path={["/review"]}>
              <ReviewAllBrowser />
            </Route>
            <Route path="" component={NotFound} />
          </Switch>
        )}
      </div>
    </>
  );
}

export default App;

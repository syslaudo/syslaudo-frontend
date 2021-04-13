import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Body } from "./components/Body";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { UsersProvider } from "./hooks/useUsers";
import { Doctors } from "./pages/Doctors";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Patients } from "./pages/Patients";
import { PageNotFound } from "./pages/PageNotFound";
import { isAuthenticated } from "./services/Auth";
import { GlobalStyle } from "./styles/global";
import { PatientsProvider } from "./hooks/usePatients";
import { Users } from "./pages/Users";

const PrivateRoute = ({ component, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated() ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

function App() {
  return (
    <UsersProvider>
      <PatientsProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Header />
          <Body>
            <Switch>
              <Route path="/login" exact={true} component={Login} />
              <PrivateRoute exact={true} path="/" component={Home} />
              <PrivateRoute exact={true} path="/inicio" component={Home} />
              <PrivateRoute exact={true} path="/usuarios" component={Users} />
              <PrivateRoute exact={true} path="/medicos" component={Doctors} />
              <PrivateRoute
                exact={true}
                path="/pacientes"
                component={Patients}
              />
              <PrivateRoute exact={true} path="/*" component={PageNotFound} />
            </Switch>
            <ToastContainer autoClose={3000} />
          </Body>
          <Footer />
        </BrowserRouter>
      </PatientsProvider>
    </UsersProvider>
  );
}

export default App;

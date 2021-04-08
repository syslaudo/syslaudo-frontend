import React from 'react';
import { Redirect, BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Body } from "./components/Body";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { DoctorsProvider } from "./hooks/useDoctors";
import { ExamCreate } from "./pages/ExamCreate";
import { PacientCreate } from "./pages/PacientCreate";
import { Home } from "./pages/Home";
import { Doctors } from "./pages/Doctors";
import { Login } from "./pages/Login";
import { PageNotFound } from "./pages/PageNotFound";
import { ExamRequestCreate } from "./pages/ExamRequestCreate";
import { GlobalStyle } from "./styles/global";
import { isAuthenticated } from './services/Auth';

const PrivateRoute = ({component, ...rest}: any) => {
  const routeComponent = (props: any) => (
       isAuthenticated()
           ? React.createElement(component, props)
           : <Redirect to={{pathname: '/login'}}/>
   );
   return <Route {...rest} render={routeComponent}/>;
};

function App() {
  return (
    <DoctorsProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Body>
          <Switch>
            <Route path="/login" exact={true} component={Login} />
            <PrivateRoute exact={true} path="/inicio" component={Home} />
            <PrivateRoute exact={true} path="/medicos" component={Doctors} />
            <PrivateRoute exact={true} path="/pacientes/cadastro" component={PacientCreate} />
            <PrivateRoute exact={true} path="/exames/cadastro" component={ExamCreate} />
            <PrivateRoute exact={true} path="/exames/solicitacao" component={ExamRequestCreate} />
            <PrivateRoute exact={true} path="/*" component={PageNotFound} />
          </Switch>
          <ToastContainer autoClose={3000} />
        </Body>
        <Footer />
      </BrowserRouter>
    </DoctorsProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Body } from './components/Body';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ExamsProvider } from './hooks/useExams';
import { PatientsProvider } from './hooks/usePatients';
import { UsersProvider } from './hooks/useUsers';
import { Doctors } from './pages/Doctors';
import { ExamRequests } from './pages/ExamRequests';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { PageNotFound } from './pages/PageNotFound';
import { Patients } from './pages/Patients';
import { Users } from './pages/Users';
import { UserPasswordUpdateForm } from './pages/Users/UserPasswordUpdateForm';
import { isAuthenticated, loggedUser } from './services/auth';
import { GlobalStyle } from './styles/global';

const PrivateRoute = ({ component, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

const AdminRoute = ({ component, ...rest }: any) => {
  const routeComponent = (props: any) =>
    loggedUser.type === 'Administrador' ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: '/inicio' }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

function App() {
  return (
    <UsersProvider>
      <PatientsProvider>
        <ExamsProvider>
          <GlobalStyle />
          <BrowserRouter>
            <Header />
            <Body>
              <Switch>
                <Route path="/login" exact={true} component={Login} />
                <PrivateRoute exact={true} path="/" component={Home} />
                <PrivateRoute exact={true} path="/inicio" component={Home} />
                <AdminRoute exact={true} path="/usuarios" component={Users} />
                <AdminRoute
                  exact={true}
                  path="/trocar-senha"
                  component={UserPasswordUpdateForm}
                />
                <PrivateRoute exact={true} path="/exames" component={ExamRequests} />
                <AdminRoute exact={true} path="/medicos" component={Doctors} />
                <PrivateRoute
                  exact={true}
                  path="/pacientes"
                  component={Patients}
                />
                <PrivateRoute exact={true} path="/*" component={PageNotFound} />
              </Switch>
              <ToastContainer autoClose={2000} />
            </Body>
            <Footer />
          </BrowserRouter>
        </ExamsProvider>
      </PatientsProvider>
    </UsersProvider>
  );
}

export default App;

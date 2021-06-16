import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Body } from './components/Body';
import { Can } from './components/Can';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ExamsProvider } from './hooks/useExams';
import { PatientsProvider } from './hooks/usePatients';
import { UsersProvider } from './hooks/useUsers';
import { Dashboard } from './pages/Dashboard';
import { Doctors } from './pages/Doctors';
import { Exams } from './pages/Exams';
import { CanceledExams } from './pages/Exams/CanceledExams';
import { FinalizedExam } from './pages/Exams/FinalizedExam';
import { InfoPrint1 } from './pages/Exams/InfoPrint1';
import { InfoPrint2 } from './pages/Exams/InfoPrint2';
import { InfoPrint3 } from './pages/Exams/InfoPrint3';
import { InfoPrintPatient } from './pages/Exams/InfoPrintPatient';
import { PendingReport } from './pages/Exams/PendingReport';
import { ScheduledExams } from './pages/Exams/ScheduledExams';
import { TemporaryReport } from './pages/Exams/TemporaryReport';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { PageNotFound } from './pages/PageNotFound';
import { PatientAccess } from './pages/PatientAccess';
import { Patients } from './pages/Patients';
import { Users } from './pages/Users';
import { AdminPasswordUpdateForm } from './pages/Users/AdminPasswordUpdateForm';
import { UserPasswordUpdateForm } from './pages/Users/UserPasswordUpdateForm';
import { isAuthenticated, loggedUser } from './services/auth';
import { GlobalStyle } from './styles/global';

const LoginRoute = ({ component, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      <Redirect to={{ pathname: '/dashboard' }} />
    ) : (
      React.createElement(component, props)
    );
  return <Route {...rest} render={routeComponent} />;
};

const PrivateRoute = ({ component, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: '/' }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

const AdminRoute = ({ component, ...rest }: any) => {
  const routeComponent = (props: any) =>
    loggedUser.type === 'Administrador' ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: '/dashboard' }} />
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
            <Can
              authorizedTypes={[
                'Administrador',
                'Médico',
                'Residente',
                'Professor',
              ]}
            >
              <Header />
            </Can>
            <Body>
              <Switch>
                <LoginRoute path="/login" exact={true} component={Login} />
                <LoginRoute exact={true} path="/" component={Home} />
                <Route
                  exact={true}
                  path="/acesso-paciente"
                  component={PatientAccess}
                />
                <PrivateRoute
                  exact={true}
                  path="/print1"
                  component={InfoPrint1}
                />
                <PrivateRoute
                  exact={true}
                  path="/print2"
                  component={InfoPrint2}
                />
                <PrivateRoute
                  exact={true}
                  path="/print3"
                  component={InfoPrint3}
                />
                <Route
                  exact={true}
                  path="/printpatient"
                  component={InfoPrintPatient}
                />
                <PrivateRoute
                  exact={true}
                  path="/dashboard"
                  component={Dashboard}
                />
                <AdminRoute exact={true} path="/usuarios" component={Users} />
                <AdminRoute
                  exact={true}
                  path="/admin-alterar-senha"
                  component={AdminPasswordUpdateForm}
                />
                <Route
                  exact={true}
                  path="/alterar-senha"
                  component={UserPasswordUpdateForm}
                />
                <PrivateRoute exact={true} path="/exames" component={Exams} />
                <PrivateRoute
                  exact={true}
                  path="/exames/agendados"
                  component={ScheduledExams}
                />
                <PrivateRoute
                  exact={true}
                  path="/exames/cancelados"
                  component={CanceledExams}
                />
                <PrivateRoute
                  exact={true}
                  path="/exames/pendentes"
                  component={PendingReport}
                />
                <PrivateRoute
                  exact={true}
                  path="/exames/provisorios"
                  component={TemporaryReport}
                />
                <PrivateRoute
                  exact={true}
                  path="/exames/concluidos"
                  component={FinalizedExam}
                />
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
            <Can
              authorizedTypes={[
                'Administrador',
                'Médico',
                'Residente',
                'Professor',
              ]}
            >
              <Footer />
            </Can>
          </BrowserRouter>
        </ExamsProvider>
      </PatientsProvider>
    </UsersProvider>
  );
}

export default App;

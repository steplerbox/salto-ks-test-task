import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import AuthPage from './pages/AuthPage';
import ExplorePage from './pages/ExplorePage';
import RepositoryPage from './pages/RepositoryPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';
import AuthHelper from './components/AuthHelper';

export default function App() {
  return (
    <ErrorBoundary>
      <CssBaseline/>

      <AuthHelper/>

      <Router>
        <Switch>
          <Route exact path='/'>
            <ExplorePage/>
          </Route>
          <Route exact path='/auth'>
            <AuthPage/>
          </Route>
          <Route exact path='/:userName/:repositoryName'>
            {props => <RepositoryPage {...props} />}
          </Route>
          <Route path='/*'>
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}

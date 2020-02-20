import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navigation from './components/navigation';
import Page from './components/page';

import Home from './routes/home';
import Map from './routes/map';
import Login from './routes/login';

const App: React.SFC = () => (
  <Router>
    <Page>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/map" component={Map} />
        <Route path="/login" component={Login} />
      </Switch>
    </Page>
  </Router>
);

export default App;

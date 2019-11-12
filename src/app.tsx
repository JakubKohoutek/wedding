import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navigation from './components/navigation';
import Page from './components/page';

import Home from './routes/home';
import Map from './routes/map';

const App: React.SFC = () => (
  <Router>
    <Page>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/map" component={Map} />
      </Switch>
    </Page>
  </Router>
);

export default App;

import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navigation from './components/navigation';
import Page from './components/page';

const Home = lazy(() => import('./routes/home'));
const Map = lazy(() => import('./routes/map'));

const App: React.SFC = () => (
  <Router>
    <Page>
      <Navigation />
      <Suspense fallback={<div>Loading the page...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/map" component={Map} />
        </Switch>
      </Suspense>
    </Page>
  </Router>
);

export default App;

import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navigation from './components/navigation';
import Page from './components/page';
import {context, defaultUserState} from './context';

import Home from './routes/home';
import Map from './routes/map';
import Login from './routes/login';

import {useLocalStorage} from './utils/useLocalStorage';

const App: React.SFC = () => {
  const [user, setUser] = useLocalStorage('user', defaultUserState);

  return (
    <Router>
      <context.Provider value={{user, setUser}}>
        <Page>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/map" component={Map} />
            <Route path="/login" component={Login} />
          </Switch>
        </Page>
      </context.Provider>
    </Router>
  );
};

export default App;

import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navigation from './components/navigation';
import Page from './components/page';
import {context, defaultUserState} from './context';

import Home from './routes/home';
import Map from './routes/map';
import Login from './routes/login';
import Gifts from './routes/gifts/gifts';

import {useLocalStorage} from './utils/useLocalStorage';
import QuestionnaireForm from './routes/questionnaire/form';

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
            <Route path="/gifts" component={Gifts} />
            <Route path="/questionnaire" component={QuestionnaireForm} />
          </Switch>
        </Page>
      </context.Provider>
    </Router>
  );
};

export default App;

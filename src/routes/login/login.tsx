import React, {useContext, useState} from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core';

import LoginForm from './loginForm';
import RegistrationForm from './registrationForm';
import {context, defaultUserState} from '../../context';

import {logout} from '../../utils/apiClient';

import './login.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

const Login: React.FunctionComponent = () => {
  const {user, setUser} = useContext(context);
  const [registered, setRegistered] = useState(true);
  const history = useHistory();

  const goToHomePage = (): void => {
    history.push('/');
  };

  const goToQuestionnaire = (): void => {
    history.push('/questionnaire');
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      setUser(defaultUserState);
      goToHomePage();
    } catch (error) {
      console.error(error);
    }
  };

  if (!user.id) {
    return (
      <div className="login">
        <ThemeProvider theme={theme}>
          {registered ? (
            <LoginForm showRegistrationForm={(): void => setRegistered(false)} />
          ) : (
            <RegistrationForm />
          )}
        </ThemeProvider>
      </div>
    );
  }

  return (
    <div className="login">
      <ThemeProvider theme={theme}>
        <Card className="login__paper">
          <p>Jsi přihlášen jako {user.username}</p>
          <p>
            Pokud jsi tak ještě neučinil(a), dej nám prosím prostřednictvím krátkého
            dotazníku vědět, zda dorazíš a kdo dorazí s tebou.
          </p>
          <div className="login__logout-button">
            <Button onClick={handleLogout} variant="contained" color="secondary">
              Odhlásit
            </Button>
            <Button onClick={goToQuestionnaire} variant="contained" color="primary">
              Dát vědět účast
            </Button>
          </div>
        </Card>
      </ThemeProvider>
    </div>
  );
};

export default Login;

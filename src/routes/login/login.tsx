import React, {useContext, useState} from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import LoginForm from './loginForm';
import RegistrationForm from './registrationForm';
import {context, defaultUserState} from '../../context';

import {logout} from '../../utils/apiClient';

import './login.css';

const Login: React.FunctionComponent = () => {
  const {user, setUser} = useContext(context);
  const [registered, setRegistered] = useState(true);

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      setUser(defaultUserState);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user.id) {
    return (
      <div className="login">
        {registered ? (
          <LoginForm showRegistrationForm={(): void => setRegistered(false)} />
        ) : (
          <RegistrationForm />
        )}
      </div>
    );
  }

  return (
    <div className="login">
      <Card className="login__paper">
        <p>Jsi přihlášen jako {user.username}</p>
        <p>
          Pokud jsi tak ještě neučinil(a), dej nám prosím vědět zda dorazíš a kdo dorazí s
          tebou prostřednictvím <a href="/questionnaire">krátkého dotazníku</a>.
        </p>
        <div className="login__logout-button">
          <Button onClick={handleLogout} variant="contained" color="primary">
            Odhlásit
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;

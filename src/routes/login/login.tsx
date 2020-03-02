import React, {useContext, useState} from 'react';
import Card from '@material-ui/core/Card';

import {context} from '../../context';
import RegistrationForm from './registrationForm';

import './login.css';
import LoginForm from './loginForm';

const Login: React.FunctionComponent = () => {
  const {user} = useContext(context);
  const [registered, setRegistered] = useState(true);

  return (
    <div className="login">
      {user.id ? (
        <Card className="login__paper">Jsi přihlášen jako {user.username}!</Card>
      ) : registered ? (
        <LoginForm showRegistrationForm={(): void => setRegistered(false)} />
      ) : (
        <RegistrationForm />
      )}
    </div>
  );
};

export default Login;

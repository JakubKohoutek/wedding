import React, {useContext, useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import {UserDTO} from '../../../server/src/entity/User';

import LoginForm from './loginForm';
import {context, defaultUserState} from '../../context';
import RegistrationForm from './registrationForm';

import {logoutIfUnauthorized, logout} from '../../utils/apiClient';

import './login.css';

const getAllUsers = async (): Promise<UserDTO[]> => {
  const response = await fetch('/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
  await logoutIfUnauthorized(response);

  return await response.json();
};

const Login: React.FunctionComponent = () => {
  const {user, setUser} = useContext(context);
  const [registered, setRegistered] = useState(true);
  const [listOfUsers, setListOfUsers] = useState<UserDTO[]>([]);

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      setUser(defaultUserState);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const users = await getAllUsers();
        setListOfUsers(users);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [registered]);

  return (
    <div className="login">
      {user.id ? (
        <Card className="login__paper">
          <p>Jsi přihlášen jako {user.username}</p>
          <p>
            Pokud jsi tak ještě neučinil(a), dej nám prosím vědět zda dorazíš a kdo dorazí
            s tebou prostřednictvím <a href="/questionnaire">krátkého dotazníku</a>.
          </p>
          <div className="login__logout-button">
            <Button onClick={handleLogout} variant="contained" color="primary">
              Odhlásit
            </Button>
          </div>
          <p>Všichni uživatelé:</p>
          {listOfUsers.map((user) => (
            <div key={user.id}>{user.username}</div>
          ))}
        </Card>
      ) : registered ? (
        <LoginForm showRegistrationForm={(): void => setRegistered(false)} />
      ) : (
        <RegistrationForm />
      )}
    </div>
  );
};

export default Login;

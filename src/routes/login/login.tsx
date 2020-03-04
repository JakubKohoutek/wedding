import React, {useContext, useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import {UserDTO} from '../../../server/src/entity/User';

import {context, defaultUserState} from '../../context';
import RegistrationForm from './registrationForm';

import './login.css';
import LoginForm from './loginForm';

const getAllUsers = async (): Promise<UserDTO[]> => {
  const response = await fetch('/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  return await response.json();
};

const logout = async (): Promise<void> => {
  const response = await fetch('/api/auth/logout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  if (response.status !== 200) {
    throw new Error('Can not log out');
  }
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

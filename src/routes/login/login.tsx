import React, {useContext, useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import {UserDTO} from '../../../server/src/entity/User';

import {context, defaultUserState} from '../../context';
import RegistrationForm from './registrationForm';

import './login.css';
import LoginForm from './loginForm';

const getAllUsers = async (): Promise<UserDTO[]> => {
  const result = await fetch('/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  return await result.json();
};

const Login: React.FunctionComponent = () => {
  const {user, setUser} = useContext(context);
  const [registered, setRegistered] = useState(true);
  const [listOfUsers, setListOfUsers] = useState<UserDTO[]>([]);

  const logout = (): void => {
    setUser(defaultUserState);
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
            <Button onClick={logout} variant="contained" color="primary">
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

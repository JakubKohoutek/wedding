import React, {useContext, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import classNames from 'classnames';

import {context, defaultUserState} from '../../context';

import {getUser, logout} from '../../utils/apiClient';

import './page.css';

type Props = {
  children: React.ReactNode;
};

const Page: React.FunctionComponent<Props> = ({children}) => {
  const {user, setUser} = useContext(context);

  useEffect((): void => {
    if (!user.id) {
      return;
    }

    getUser(user.id)
      .then(async (response: Response) => {
        if (response.status === 401) {
          await logout();
          setUser(defaultUserState);
          throw new Error('Unauthorized');
        }

        if (response.status >= 400) {
          const result = await response.json();
          throw new Error(result.error);
        }

        return await response.json();
      })
      .catch((error: Error): void => {
        console.error(error);
      });
  });

  const location = useLocation();
  const className = location.pathname === '/' ? 'homepage' : '';

  return <div className={classNames('page', className)}>{children}</div>;
};

export default Page;

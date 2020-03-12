import React from 'react';
import classNames from 'classnames';
import {useLocation} from 'react-router-dom';

import './page.css';

type Props = {
  children: React.ReactNode;
};

const Page: React.FunctionComponent<Props> = ({children}) => {
  const location = useLocation();
  const className = location.pathname === '/' ? 'page__light' : 'page__dark';

  return <div className={classNames('page', className)}>{children}</div>;
};

export default Page;

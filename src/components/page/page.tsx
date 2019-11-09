import React from 'react';

import './page.css';

type Props = {
  children: React.ReactNode;
};

const Page: React.FunctionComponent<Props> = ({children}) => {
  return <div className="page">{children}</div>;
};

export default Page;

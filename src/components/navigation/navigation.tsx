import React from 'react';
import {Link} from 'react-router-dom';

import './navigation.css';

const Navigation: React.FunctionComponent = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Domovská stránka</Link>
        </li>
        <li>
          <Link to="/map">Mapa</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

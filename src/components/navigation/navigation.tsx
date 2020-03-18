import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import PersonIcon from '@material-ui/icons/PersonOutlined';

import {context} from '../../context';

import './navigation.css';

const Navigation: React.FunctionComponent = () => {
  const [visible, setVisibility] = useState(false);
  const {user} = useContext(context);

  return (
    <nav className="navigation">
      <ul
        className={classNames('navigation__list', {
          'navigation__list--hidden': !visible
        })}
        onClick={(): void => setVisibility(false)}>
        <li>
          <Link to="/">Domovská stránka</Link>
        </li>
        <li>
          <Link to="/map">Mapa</Link>
        </li>
        <li>
          <Link to="/gifts">Dary</Link>
        </li>
        <li>
          <Link to="/login">
            {user.username ? (
              <span>
                <PersonIcon className="navigation__login-icon" /> {user.username}
              </span>
            ) : (
              'Přihlášení'
            )}
          </Link>
        </li>
      </ul>
      <div
        className="navigation__hamburger-icon"
        onClick={(): void => setVisibility(!visible)}>
        {visible ? <span>&#10005;</span> : <span>&#9776;</span>}
      </div>
    </nav>
  );
};

export default Navigation;

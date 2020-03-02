import {createContext} from 'react';
import {UserDTO} from '../server/src/entity/User';

export const defaultUserState: UserDTO = {
  username: '',
  email: ''
};

export const context = createContext<{
  user: UserDTO;
  setUser: (user: UserDTO) => void;
}>({
  user: defaultUserState,
  setUser: () => {
    return;
  }
});

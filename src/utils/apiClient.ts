import {defaultUserState} from '../context';

export const logout = async (): Promise<void> => {
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

export const logoutIfUnauthorized = async (response: Response): Promise<void> => {
  if (response.status === 401) {
    await logout();
    window.localStorage.setItem('user', JSON.stringify(defaultUserState));
    throw new Error('Unauthorized');
  }
};

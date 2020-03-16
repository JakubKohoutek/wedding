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

export const getUser = async (userId: number): Promise<Response> => {
  const response = await fetch(`/api/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  return response;
};

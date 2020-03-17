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

export const getAttendees = async (userId: number): Promise<Response> => {
  const response = await fetch(`/api/attendance/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  return response;
};

export const deleteAttendee = async (id?: number): Promise<void> => {
  if (!id) {
    throw new Error('Missing ID');
  }

  const response = await fetch(`/api/attendance/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  if (response.status !== 200) {
    throw new Error('Could not delete');
  }
};

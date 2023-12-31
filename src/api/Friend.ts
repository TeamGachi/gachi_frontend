export const getFriends = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + 'friend/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    });

    if (response.ok) {
      const responsedData = await response.json();
      return responsedData;
    } else {
      throw new Error('친구 가져오기 요청 실패');
    }
  } catch (error) {
    throw new Error('친구 가져오기 중 오류 발생');
  }
};
export const getFriendRequest = async () => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + 'friend/request/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      },
    );

    if (response.ok) {
      const responsedData = await response.json();
      return responsedData;
    } else {
      throw new Error('친구요청 가져오기 요청 실패');
    }
  } catch (error) {
    throw new Error('친구요청 가져오기 중 오류 발생');
  }
};
export const addFriend = async (sender: string, receiver: string) => {
  const data = {
    sender: sender,
    receiver: receiver,
  };
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + 'friend/request/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify(data),
      },
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error('친구요청 가져오기 중 오류 발생');
  }
};
export const processFriendRequest = async (id: number, action: string) => {
  const data = {
    action: action,
  };
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + 'friend/request/' + id + '/',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify(data),
      },
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error('친구 수락 중 오류 발생');
  }
};

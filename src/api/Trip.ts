export const getUserTrip = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + 'trip/', {
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
      throw new Error('여행 가져오기 요청 실패');
    }
  } catch (error) {
    throw new Error('여행 가져오기 중 오류 발생');
  }
};
export const addTrip = async (
  place: string,
  start_date: string,
  end_date: string,
) => {
  const data = {
    place: place,
    departing_date: start_date,
    arriving_date: end_date,
  };
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + 'trip/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      body: JSON.stringify(data),
    });
    const responsedData = await response.json();
    console.log(responsedData);
    if (response.ok) {
      return responsedData;
    } else {
      throw new Error('여행 추가 요청 실패');
    }
  } catch (error) {
    throw new Error('여행 추가 중 오류 발생');
  }
};
export const getTripRequest = async () => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + 'trip/invite/',
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
      throw new Error('여행 요청 가져오기 요청 실패');
    }
  } catch (error) {
    throw new Error('여행 요청 가져오기 중 오류 발생');
  }
};
export const processTripRequest = async (
  id: number | undefined,
  action: string,
) => {
  const data = {
    action: action,
  };
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + 'trip/invite/' + id + '/',
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
    throw new Error('여행 초대 수락 중 오류 발생');
  }
};
export const getTripInfo = async (id: string | undefined | number) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + 'trip/' + id + '/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      },
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error('여행 초대 수락 중 오류 발생');
  }
};
export const inviteTrip = async (
  trip: string | undefined,
  sender: string,
  receiver: string,
) => {
  const data = {
    trip: trip,
    sender: sender,
    receiver: receiver,
  };
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + 'trip/invite/',
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
    throw new Error('여행 초대 중 오류 발생');
  }
};

export const setMemo = async (id: number, memo: string) => {
  const data = {
    memo: memo,
  };
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + 'trip/' + id + '/memo/',
      {
        method: 'Patch',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify(data),
      },
    );
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    throw new Error('여행 초대 수락 중 오류 발생');
  }
};

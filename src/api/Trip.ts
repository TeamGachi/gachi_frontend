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
      console.error('여행 가져오기 요청 실패:', response);
      throw new Error('여행 가져오기 요청 실패');
    }
  } catch (error) {
    console.error('여행 가져오기 중 오류 발생:', error);
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

    if (response.ok) {
      const responsedData = await response.json();
      return responsedData;
    } else {
      console.error('여행 추가 요청 실패:', response);
      throw new Error('여행 추가 요청 실패');
    }
  } catch (error) {
    console.error('여행 추가 중 오류 발생:', error);
    throw new Error('여행 추가 중 오류 발생');
  }
};
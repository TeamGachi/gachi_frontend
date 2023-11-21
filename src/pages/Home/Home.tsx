import React, {useEffect, useState} from 'react';
import Logo from '../../components/Main/Logo';
import styled from 'styled-components';
import Bottom from '../../components/Home/Bottom';
import AddTripComponent from '../../components/Bottom/AddTripComponent';
import {useRecoilState} from 'recoil';
import {isAddTripState} from '../../atoms/atom';
import TripCard from '../../components/Home/TripCard';
import {AiFillBell} from 'react-icons/ai';
import NotificationModal from '../../components/Home/NotificationModal';
import {getUserTrip} from '../../api/Trip';
import EmptyTripCard from '../../components/Home/EmptyTripCard';
interface tripProps {
  arriving_date: string;
  departing_date: string;
  id: number;
  place: string;
  users: Array<string>;
}
export default function Home() {
  const [isAdd, setIsAdd] = useRecoilState(isAddTripState);
  const [showNotice, setShowNotice] = useState(false);
  const [trips, setTrips] = useState([]);
  const getDDay = (start: string) => {
    const date1 = new Date(start);
    const date2 = new Date();

    const timeDifferenceInMilliseconds = date1.getTime() - date2.getTime();
    const timeDifferenceInDays = Math.floor(
      timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24),
    );

    if (timeDifferenceInDays < 0) {
      return `+${Math.abs(timeDifferenceInDays)}`;
    } else {
      return `-${timeDifferenceInDays}`;
    }
  };
  useEffect(() => {
    const fetchTrip = async () => {
      const response = await getUserTrip();
      setTrips(response);
    };
    fetchTrip();
  }, [isAdd]);
  console.log(trips);
  return (
    <>
      {isAdd && <AddTripComponent setTrip={setTrips} />}
      {showNotice && (
        <NotificationModal onClick={setShowNotice} setTrip={setTrips} />
      )}
      <LogoWrapper>
        <Logo title="Gachi" />
        <div className="alert" onClick={() => setShowNotice(true)}>
          <AiFillBell size="24" />
        </div>
      </LogoWrapper>
      <TripItemGallery>
        <TripItemWrapper>
          {trips.length > 0 ? (
            <>
              {trips.map((item: tripProps) => (
                <TripCard
                  key={item.id}
                  id={item.id}
                  date={`${item.departing_date}-${item.arriving_date}`}
                  tripName={item.place}
                  dday={getDDay(item.departing_date)}
                  memos={[]}
                />
              ))}
            </>
          ) : (
            <EmptyTripCard />
          )}
        </TripItemWrapper>
      </TripItemGallery>
      <Bottom />
    </>
  );
}
const LogoWrapper = styled.div`
  margin-top: 23px;
  margin-bottom: 40px;
  padding: 0px 20px 0px 20px;
  display: flex;
  .alert {
    margin-left: auto;
    cursor: pointer;
  }
`;

const TripItemGallery = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
const TripItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  transform: translate(-27%, 0%);
  width: 216%;
`;

const Travel = {
  Date: styled.p`
    color: #000;
    margin: 24px 24px 12px 24px;
    font-family: Pretendard-Regular;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 183.333% */
    letter-spacing: -0.408px;
  `,
  Title: styled.p`
    margin-left: 24px;
    margin-bottom: 12px;
    color: #000;
    font-family: Pretendard-Bold;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 91.667% */
    letter-spacing: -0.408px;
  `,
  DDay: styled.div`
    margin-left: 24px;
    display: inline-flex;
    padding: 2px 8px;
    align-items: flex-start;
    gap: 8px;
    border-radius: 12px;
    border: 0.25px solid rgba(20, 34, 81, 0.06);
    background: #b1b1b1;
    color: white;
  `,
  TodoBox: styled.div`
    width: 197px;
    height: 125px;
    padding: 12px;
    margin: 0 auto;
    margin-top: 24px;
    flex-shrink: 0;
    border-radius: 13px;
    background: #ededed;
    display: flex;
    flex-direction: column;
  `,
  Todo: styled.p`
    color: #000;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 183.333% */
    letter-spacing: -0.408px;
  `,
  CloudBox: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  `,
  PayCloud: styled.div`
    display: inline-flex;
    padding: 6px;
    border-radius: 8px;
    border: 1px solid #e4e4e4;
    background: #efefef;
    word-break: keep-all;
    text-align: center;
    cursor: pointer;
  `,
  PhotoCloud: styled.div`
    display: inline-flex;
    padding: 6px;
    border-radius: 8px;
    border: 1px solid #e4e4e4;
    background: #efefef;
    word-break: keep-all;
    text-align: center;
    cursor: pointer;
  `,
};

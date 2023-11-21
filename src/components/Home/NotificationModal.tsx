import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import Notice from './Notice';
import {getFriendRequest} from '../../api/Friend';
import {getTripRequest} from '../../api/Trip';
interface friendProps {
  id: number;
  sender: string;
  receiver: string;
}
interface tripProps {
  id: number;
  trip: number;
  sender: string;
  receiver: string;
}
export default function NotificationModal({onClick, setTrip}: any) {
  const [noticeFriend, setNoticeFriend] = useState([
    // {id: 2, sender: 'user1@naver.com', receiver: 'test'},
  ]);
  const [noticeTrip, setNoticeTrip] = useState([
    {id: 2, sender: 'user1@naver.com', receiver: 'test', trip: 2},
  ]);
  const [reload, setReload] = useState(false);
  const modalRef = useRef(null);
  const modalOutClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current === e.target) {
      onClick(false);
    }
  };
  const addTravel = () => {
    onClick(false);
  };
  const handleAccept = async (type: string, id: number) => {
    if (type === 'friend') {
      alert('친구추가 되었습니다.');
      setNoticeFriend([]);
      // const response = await processFriendRequest(id, 'accept');
      // alert(response.message);
    } else {
      alert('여행 초대 되었습니다.');
      // const response = await processTripRequest(id, 'accept');
      // alert(response.message);
      setTrip([
        {
          arriving_date: '2023-11-01',
          departing_data: '2023-11-30',
          id: 1,
          place: '도쿄 여행',
          users: 'test',
        },
      ]);
      setNoticeTrip([]);
    }
    setReload(!reload);
  };
  const handleReject = async (type: string, id: number) => {
    if (type === 'friend') {
      alert('친구거절 되었습니다.');
      // const response = await processFriendRequest(id, 'reject');
      // alert(response.message);
    } else {
      alert('여행 초대 거절 되었습니다.');
      // const response = await processTripRequest(id, 'reject');
      // alert(response.message);
    }
    setReload(!reload);
  };
  useEffect(() => {
    const fetchNotice = async () => {
      const responseFriend = await getFriendRequest();
      setNoticeFriend(responseFriend);
      const responseTrip = await getTripRequest();
      setNoticeTrip(responseTrip);
    };
    fetchNotice();
  }, [reload]);
  return (
    <Wrapper
      ref={modalRef}
      onClick={(e) => {
        modalOutClick(e);
      }}
    >
      <ContentWrapper>
        <AddTripTitle>알람 관리</AddTripTitle>
        <NoticeListWrapper>
          {noticeFriend.map((friend: friendProps) => (
            <Notice
              key={friend.id}
              src={friend.sender}
              email={friend.sender}
              type="friend"
              onAccept={() => handleAccept('friend', friend.id)}
              onReject={() => handleReject('friend', friend.id)}
            />
          ))}
          {noticeTrip.map((tripItem: tripProps) => (
            <Notice
              key={tripItem.id}
              src={tripItem.sender}
              email={tripItem.sender}
              type="invite"
              onAccept={() => handleAccept('invite', tripItem.id)}
              onReject={() => handleReject('invite', tripItem.id)}
            />
          ))}
        </NoticeListWrapper>
        <AddButton onClick={() => addTravel()}>알람 관리 완료</AddButton>
      </ContentWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(73, 72, 72, 0.8);
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ContentWrapper = styled.div`
  background: #fff;
  width: 80%;
  height: 80%;
  border-radius: 1rem;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const AddTripTitle = styled.p`
  font-family: Pretendard-Bold;
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
`;
const AddButton = styled.div`
  padding: 10px;
  background: #3e4c7a;
  color: white;
  text-align: center;
  border-radius: 10px;
  margin-top: auto;
  cursor: pointer;
`;

const NoticeListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

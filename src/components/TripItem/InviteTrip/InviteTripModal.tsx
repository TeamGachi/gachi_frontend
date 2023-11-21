import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import Friend from './Friend';
import {getFriends} from '../../../api/Friend';
interface friendProps {
  id: number;
  user: string;
  friend: string;
}
export default function InviteTripModal({onClick}: any) {
  const [friends, setFriends] = useState([
    {id: 2, user: 'user1@naver.com', friend: 'user2@naver.com'},
  ]);
  const modalRef = useRef(null);
  const modalOutClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current === e.target) {
      onClick(false);
    }
  };
  const addTravel = () => {
    onClick(false);
  };
  return (
    <Wrapper
      ref={modalRef}
      onClick={(e) => {
        modalOutClick(e);
      }}
    >
      <ContentWrapper>
        <AddTripTitle>여행 초대</AddTripTitle>
        <FriendListWrapper>
          {friends.map((friend: friendProps) => (
            <Friend
              key={friend.friend}
              src={friend.friend}
              email={friend.friend}
            />
          ))}
        </FriendListWrapper>
        <AddButton onClick={() => addTravel()}>여행 초대 완료</AddButton>
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

const FriendListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import Friend from './Friend';
import {GrAdd} from 'react-icons/gr';
import {addFriend, getFriends} from '../../api/Friend';
import {useRecoilValue} from 'recoil';
import {userInfoState} from '../../atoms/atom';
interface friendProps {
  id: number;
  user: string;
  friend: string;
}
export default function AddFriendModal({onClick}: any) {
  const [friends, setFriends] = useState([
    // {id: 2, user: '/images/sample2.png', friend: 'user2@naver.com'},
    {id: 2, user: '/images/sample.png', friend: 'user1@naver.com'},
  ]);
  const [receiver, setReceiver] = useState('');
  const userEmail = useRecoilValue(userInfoState);
  const modalRef = useRef(null);
  const modalOutClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current === e.target) {
      onClick(false);
    }
  };
  const addTravel = async () => {
    if (!receiver) {
      alert('추가할 이메일을 입력하세요');
      return;
    }
    // const response = await addFriend(userEmail.email, receiver);
    // if (!response.message) {
    alert('친구추가 되었습니다.');
    // } else {
    //   alert(response.message);
    // }
  };
  const closeModal = () => {
    onClick(false);
  };
  useEffect(() => {
    const fetchFriend = async () => {
      const response = await getFriends();
      setFriends(response);
    };
    fetchFriend();
  }, []);
  return (
    <Wrapper
      ref={modalRef}
      onClick={(e) => {
        modalOutClick(e);
      }}
    >
      <ContentWrapper>
        <AddTripTitle>친구 목록</AddTripTitle>
        <FriendListWrapper>
          {friends.map((friend: friendProps) => (
            <Friend
              key={friend.friend}
              src={friend.user}
              email={friend.friend}
            />
          ))}
        </FriendListWrapper>
        <AddFriendWrapper>
          <AddFriendInput
            placeholder="친구 추가 할 이메일 입력하세요"
            onChange={(e) => setReceiver(e.target.value)}
          />
          <FriendAdd>
            <GrAdd size="30" onClick={() => addTravel()} />
          </FriendAdd>
        </AddFriendWrapper>
        <AddButton onClick={closeModal}>확인</AddButton>
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
  cursor: pointer;
`;

const FriendListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const AddFriendWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  margin-bottom: 30px;
`;

const AddFriendInput = styled.input`
  width: 80%;
  height: 40px;
`;
const FriendAdd = styled.div`
  margin-left: auto;
  padding-right: 8px;
  cursor: pointer;
`;

import React, {useEffect, useState} from 'react';
import {styled} from 'styled-components';
import {GrAdd} from 'react-icons/gr';
import {getUserImage} from '../../../utils/getUserImage';
import {userInfoState} from '../../../atoms/atom';
import {useRecoilValue} from 'recoil';
import {inviteTrip} from '../../../api/Trip';
import {useParams} from 'react-router-dom';

interface FriendInfoProps {
  src: string;
  email: string;
}
export default function Friend({src, email}: FriendInfoProps) {
  const {travelNumber} = useParams();
  const [userImage, setUserImage] = useState('');
  const userEmail = useRecoilValue(userInfoState);
  const handleInviteFriend = async () => {
    const userConfirm = confirm('여행에 초대하시겠습니까?');
    // if (userConfirm) {
    //   const response = await inviteTrip(travelNumber, userEmail.email, email);
    alert('초대했습니다.');
    // }
  };
  return (
    <FriendWrapper>
      <FriendInfo>
        <FriendProfile src={`/images/sample2.png`} />
        <FriendEmail>{email}</FriendEmail>
        <FriendAdd>
          <GrAdd size="30" onClick={handleInviteFriend} />
        </FriendAdd>
      </FriendInfo>
    </FriendWrapper>
  );
}

const FriendWrapper = styled.div`
  width: 320px;
  height: 60px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.08);
`;

const FriendInfo = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const FriendProfile = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 100%;
`;

const FriendEmail = styled.div`
  margin-left: 10px;
`;

const FriendAdd = styled.div`
  margin-left: auto;
  padding-right: 8px;
  cursor: pointer;
`;

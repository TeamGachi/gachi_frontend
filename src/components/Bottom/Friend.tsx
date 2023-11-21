import React, {useEffect, useState} from 'react';
import {styled} from 'styled-components';
import {GrAdd} from 'react-icons/gr';
import {getUserImage} from '../../utils/getUserImage';

interface FriendInfoProps {
  src: string;
  email: string;
}
export default function Friend({src, email}: FriendInfoProps) {
  const [userImage, setUserImage] = useState('');
  return (
    <FriendWrapper>
      <FriendInfo>
        <FriendProfile src={src} />
        <FriendEmail>{email}</FriendEmail>
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

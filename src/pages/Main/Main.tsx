import React, {useState} from 'react';
import Logo from '../../components/Main/Logo';
import styled from 'styled-components';
import Button from '../../components/Main/Button';
import {useNavigate} from 'react-router-dom';
import {getLoginUser} from '../../api/Authentication';
import {useRecoilState} from 'recoil';
import {userInfoState} from '../../atoms/atom';
export default function Main() {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate('/register');
  };
  const handleLoginClick = async () => {
    if (!email || !password) {
      alert('이메일 또는 비밀번호를 입력해주세요.');
      return;
    }
    // const response = await getLoginUser('login/', email, password);
    // if (response.ok) {
    //   const token = await response.json();
    //   localStorage.setItem('access', token.access);
    //   localStorage.setItem('refresh', token.refresh);
    setUserInfo({email: email});
    alert('로그인 되었습니다.');
    navigate('home');
    // } else {
    //   alert('로그인에 실패하였습니다.');
    // }
  };
  return (
    <>
      <LogoWrapper>
        <Logo title="Gachi" />
      </LogoWrapper>
      <Title>로그인</Title>
      <Form.Wrapper>
        <Form.Content>
          <Form.Title>이메일 주소</Form.Title>
          <Form.Input
            placeholder="예) gachi@gachi.com"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Input>
        </Form.Content>
        <Form.Content>
          <Form.Title>비밀번호</Form.Title>
          <Form.Input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Input>
        </Form.Content>
      </Form.Wrapper>
      <LoginButtonWrapper onClick={handleLoginClick}>
        <Button state={false} text="로그인하기" size={300} />
      </LoginButtonWrapper>
      <RegisterButtonWrapper>
        <Menu onClick={handleRegisterClick}>회원가입</Menu>
        <Split />
        <Menu>비밀번호 찾기</Menu>
      </RegisterButtonWrapper>
      <EasyLoginWrapper>
        <Line />
        <EasyLogin>간편 로그인 하기</EasyLogin>
        <Line />
      </EasyLoginWrapper>
      <EasyLoginButton className="kakao">
        <LoginIcon src={'/images/kakao.svg'} />
        <LoginText>카카오로 로그인</LoginText>
      </EasyLoginButton>
      <EasyLoginButton className="google">
        <LoginIcon src={'/images/google.png'} />
        <LoginText>구글로 로그인</LoginText>
      </EasyLoginButton>
    </>
  );
}

const LogoWrapper = styled.div`
  margin-top: 23px;
  margin-bottom: 40px;
  padding-left: 22px;
`;
const Title = styled.p`
  margin-left: 26px;
  margin-bottom: 40px;
  color: #000;
  font-family: Pretendard-Bold;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
`;
const Form = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 28px;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Title: styled.p`
    padding-left: 23px;
    font-family: Pretendard-Regular;
  `,
  Input: styled.input`
    width: 333px;
    padding: 11px 16px 11px 0px;
    margin: 0px 8px 0px 24px;
    border: none;
    outline: none;
    border-bottom: 2px solid #d1d1d4;
  `,
};
const LoginButtonWrapper = styled.div`
  text-align: center;
  margin-top: 34px;
  margin-bottom: 14px;
`;

const RegisterButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 28px;
`;
const Menu = styled.div`
  font-family: Pretendard-Regular;
  font-size: 16px;
  cursor: pointer;
`;
const Split = styled.div`
  width: 1px;
  height: 12px;
  flex-shrink: 0;
  background: #d9d9d9;
  margin-left: 59px;
  margin-right: 49px;
`;
const EasyLoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 17px;
  margin-bottom: 34px;
`;
const EasyLogin = styled.p`
  color: #a5a5a5;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 183.333% */
  letter-spacing: -0.408px;
`;

const Line = styled.div`
  width: 128px;
  height: 1px;
  background: #d9d9d9;
`;

const EasyLoginButton = styled.div`
  position: relative;
  margin: 0 auto;
  margin-bottom: 12px;
  width: 320px;
  height: 52px;
  border-radius: 63px;
  cursor: pointer;
  &.kakao {
    background: #fee500;
  }
  &.google {
    background: #fff;
    border: 1px solid #dadada;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginIcon = styled.img`
  position: absolute;
  width: 29px;
  height: 29px;
  left: 16px;
`;
const LoginText = styled.p`
  color: #000;
  font-family: Pretendard-Bold;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 137.5% */
  letter-spacing: -0.408px;
`;

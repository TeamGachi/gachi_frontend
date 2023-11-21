import React, {useState} from 'react';
import Logo from '../../components/Main/Logo';
import styled, {css, keyframes} from 'styled-components';
import Button from '../../components/Main/Button';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {postRegisterUser} from '../../api/Authentication';

interface FormValue {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  gender: string;
  birth: string;
  face_image: string;
}
export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: {errors},
    getValues,
    watch,
  } = useForm<FormValue>({mode: 'onChange'});
  const [profileImg, setProfileImg] = useState();
  const navigate = useNavigate();
  const handleNext = () => {
    if (inputFirstStep()) setCurrentStep(2);
  };
  const handleBefore = () => {
    setCurrentStep(1);
  };
  const registerUser = async () => {
    if (!inputFirstStep()) return;
    if (!inputSecondStep()) return;
    if (!profileImg) return;
    const sendData = new FormData();
    sendData.append('email', getValues('email'));
    sendData.append('password', getValues('password'));
    sendData.append('password_again', getValues('passwordConfirm'));
    sendData.append('gender', getValues('gender'));
    sendData.append('birth', getValues('birth'));
    sendData.append('name', getValues('name'));
    sendData.append('face_image', profileImg);
    // const response = await postRegisterUser('signup/', sendData);
    // if (response) {
    alert('회원가입 되었습니다.');
    navigate('/');
    // }
  };
  const inputFirstStep = () => {
    if (
      watch('email', '') !== '' &&
      watch('password', '') !== '' &&
      watch('passwordConfirm', '') !== '' &&
      getValues('password') === getValues('passwordConfirm')
    ) {
      return true;
    }
    return false;
  };
  const inputSecondStep = () => {
    if (
      watch('name', '') !== '' &&
      watch('gender', '') !== '' &&
      watch('birth', '') !== ''
    ) {
      return true;
    }
    return false;
  };
  const saveFileImage = (e: any) => {
    if (e.target.files) setProfileImg(e.target.files[0]);
  };
  return (
    <form onSubmit={handleSubmit(registerUser)} method="POST">
      <RegisterWrapper $currentstep={currentStep}>
        <LogoWrapper>
          <Logo title={''} />
        </LogoWrapper>
        <Title>회원가입</Title>
        <div className="registerForm">
          <Form.Wrapper>
            <Form.Content>
              <Form.Title>이메일 주소</Form.Title>
              <Form.Input
                placeholder="예) gachi@gachi.com"
                {...register('email', {
                  required: '이메일은 필수 입력입니다.',
                  pattern: {
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: '이메일 형식에 맞지 않습니다.',
                  },
                })}
              />
              {errors.email && <Form.Error>{errors.email.message}</Form.Error>}
            </Form.Content>
            <Form.Content>
              <Form.Title>비밀번호</Form.Title>
              <Form.Input
                type="password"
                placeholder="*********"
                {...register('password', {
                  required: '비밀번호는 필수 입력입니다.',
                })}
              />
              {errors.password && (
                <Form.Error>{errors.password.message}</Form.Error>
              )}
            </Form.Content>
            <Form.Content>
              <Form.Title>비밀번호확인</Form.Title>
              <Form.Input
                type="password"
                placeholder="*********"
                {...register('passwordConfirm', {
                  required: '비밀번호는 필수 입력입니다.',
                  validate: {
                    check: (val) => {
                      if (getValues('password') !== val) {
                        return '비밀번호가 일치하지 않습니다.';
                      }
                    },
                  },
                })}
              />
              {errors.passwordConfirm && (
                <Form.Error>{errors.passwordConfirm.message}</Form.Error>
              )}
            </Form.Content>
            <LoginButtonWrapper onClick={handleNext}>
              <Button state={inputFirstStep()} text="다음" size={333} />
            </LoginButtonWrapper>
          </Form.Wrapper>
          <Form.Wrapper>
            <Form.Content>
              <Form.Title>이름/닉네임</Form.Title>
              <Form.Input
                {...register('name', {
                  required: '이름은 필수 입력입니다.',
                  pattern: {
                    value: /^[가-힣A-Za-z]+$/,
                    message: '이름 형식에 맞지 않습니다.',
                  },
                })}
              />
              {errors.name && <Form.Error>{errors.name.message}</Form.Error>}
            </Form.Content>
            <Form.Content>
              <Form.Title>성별</Form.Title>
              <Form.GenderWrapper>
                <Form.Gender
                  htmlFor="man"
                  $checked={watch('gender') === '남성'}
                >
                  <Form.RadioInput
                    type="radio"
                    id="man"
                    {...register('gender')}
                    value="남성"
                  />
                  남성
                </Form.Gender>
                <Form.Gender
                  htmlFor="woman"
                  $checked={watch('gender') === '여성'}
                >
                  <Form.RadioInput
                    type="radio"
                    id="woman"
                    {...register('gender')}
                    value="여성"
                  />
                  여성
                </Form.Gender>
              </Form.GenderWrapper>
            </Form.Content>
            <Form.Content>
              <Form.Title>생년월일</Form.Title>
              <Form.DateWrapper>
                <Form.InputDate
                  placeholder="YYYY-MM-DD"
                  {...register('birth', {
                    required: '생일은 필수 입력입니다.',
                    pattern: {
                      value: /^\d{4}-\d{2}-\d{2}$/,
                      message: '생일 형식에 맞지 않습니다.',
                    },
                  })}
                />
                {errors.birth && (
                  <Form.Error>{errors.birth.message}</Form.Error>
                )}
              </Form.DateWrapper>
            </Form.Content>
            <Form.Content>
              <Form.Title>프로필 사진</Form.Title>
              <Form.Input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                onChange={(event) => {
                  saveFileImage(event);
                }}
              />
              {errors.name && <Form.Error>{errors.name.message}</Form.Error>}
            </Form.Content>
            <ButtonWrapper>
              <LoginButtonWrapper onClick={handleBefore}>
                <Button state={false} text="이전" size={150} />
              </LoginButtonWrapper>
              <LoginButtonWrapper onClick={registerUser}>
                <Button state={inputSecondStep()} text="회원가입" size={150} />
              </LoginButtonWrapper>
            </ButtonWrapper>
          </Form.Wrapper>
        </div>
      </RegisterWrapper>
    </form>
  );
}
const RegisterWrapper = styled.div<{$currentstep: number}>`
  overflow: hidden;
  .registerForm {
    display: flex;
    width: 200%;
    ${(props) =>
      props.$currentstep === 1
        ? css`
            animation: ${slideLeftToRight} 0.3s ease-in-out;
            transform: translateX(0);
          `
        : css`
            animation: ${slideRightToLeft} 0.3s ease-in-out;
            transform: translateX(-50%);
          `}
  }
`;
const LogoWrapper = styled.div`
  margin-top: 23px;
  margin-bottom: 40px;
`;
const BackToForm = styled.div`
  padding-left: 20px;
  padding-bottom: 20px;
  color: #f8f8f8;
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
    width: 100%;
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
  GenderWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 14px;
    margin-top: 16px;
  `,
  Gender: styled.label<{$checked: boolean}>`
    display: flex;
    width: 120px;
    height: 8px;
    padding: 18px 16px;
    justify-content: center;
    align-items: center;
    border-radius: 43px;
    background: #f8f8f8;
    backdrop-filter: blur(40px);
    cursor: pointer;
    background-color: ${(props) => (props.$checked ? '#A6E3E9' : '#f8f8f8')};
  `,
  RadioInput: styled.input`
    display: none;
  `,
  DateWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `,
  InputDate: styled.input`
    width: 150px;
    padding: 11px;
    margin: 16px 8px 0px 24px;
    border: none;
    outline: none;
    border-bottom: 2px solid #d1d1d4;
    text-align: center;
  `,
  Error: styled.div`
    padding: 3px 0px 0px 20px;
    color: red;
  `,
};
const LoginButtonWrapper = styled.div`
  text-align: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const slideRightToLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;
const slideLeftToRight = keyframes`
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
`;

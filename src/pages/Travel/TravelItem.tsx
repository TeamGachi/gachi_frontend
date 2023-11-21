import React, {ChangeEvent, useEffect, useState} from 'react';
import Logo from '../../components/Main/Logo';
import styled from 'styled-components';
import Bottom from '../../components/Home/Bottom';
import {useRecoilState, useRecoilValue} from 'recoil';
import {isAddTripState, userInfoState} from '../../atoms/atom';
import {WiDirectionLeft} from 'react-icons/wi';
import AddTripComponent from '../../components/Bottom/AddTripComponent';
import InviteTripModal from '../../components/TripItem/InviteTrip/InviteTripModal';
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {getTripInfo} from '../../api/Trip';
import {getMyImages, getTripImages, uploadImage} from '../../api/Image';
import {getUserImage} from '../../utils/getUserImage';
import Uploading from '../../components/TripItem/Uploading';
interface FileData {
  image: string;
}
interface TripInfoProps {
  id: number;
  place: string;
  departing_date: string;
  arriving_date: string;
  users: Array<string>;
}
interface InTripUserProps {
  email: string;
  imgSrc: string;
}
export default function TravelItem() {
  const navigate = useNavigate();
  const [isAdd, setIsAdd] = useRecoilState(isAddTripState);
  const [isInvite, setIsInvite] = useState(false);
  const [Files, setFiles] = useState<FileData[]>([]);
  const {travelNumber} = useParams();
  const [tripInfo, setTripInfo] = useState<TripInfoProps>();
  const [inTripUser, setInTripUser] = useState<InTripUserProps>([
    {email: 'clcc001@naver.com', imgSrc: '/images/sample.png'},
    {email: 'clcc001@naver.com', imgSrc: '/images/sample2.png'},
  ]);
  useEffect(() => {
    console.log(localStorage.refresh);
    if (!localStorage.refresh)
      setFiles([
        {image: '/images/image/1.jpg'},
        {image: '/images/image/2.jpg'},
        {image: '/images/image/3.jpg'},
        {image: '/images/image/4.jpg'},
        {image: '/images/image/5.jpg'},
        {image: '/images/image/6.jpg'},
        {image: '/images/image/7.jpg'},
        {image: '/images/image/8.jpg'},
        {image: '/images/image/9.jpg'},
        {image: '/images/image/10.jpg'},
        {image: '/images/image/11.jpg'},
        {image: '/images/image/12.jpg'},
        {image: '/images/image/13.jpg'},
        {image: '/images/image/14.jpg'},
        {image: '/images/image/15.jpg'},
        {image: '/images/image/16.jpg'},
        {image: '/images/image/17.jpg'},
        {image: '/images/image/18.jpg'},
        {image: '/images/image/19.jpg'},
      ]);
  }, []);
  const [showUserImage, setShowUserImage] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [isGet, setIsGet] = useState(false);
  const userEmail = useRecoilValue(userInfoState);
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    setIsUpload(true);
    try {
      if (!e.target.files) return;
      const files = Array.from(e.target.files);
      const images: File[] = [];
      files.forEach((file) => {
        if (!file.name.match(/.(jpg|jpeg|png)$/i)) {
          alert('jpg,jpeg,png만 넣어주세요.');
          return;
        }
        images.push(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFiles((preValue) => [
            ...preValue,
            {
              image: reader.result as string,
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('File upload error:', error);
    }
    setTimeout(() => {
      setIsUpload(false);
      alert('업로드 되었습니다.');
    }, 2000);
  };
  const handleShowMine = async () => {
    setIsGet(true);
    if (!localStorage.refresh)
      setFiles([
        {image: '/images/image/1.jpg'},
        {image: '/images/image/2.jpg'},
        {image: '/images/image/3.jpg'},
        {image: '/images/image/5.jpg'},
        {image: '/images/image/4.jpg'},
        {image: '/images/image/11.jpg'},
        {image: '/images/image/12.jpg'},
        {image: '/images/image/13.jpg'},
        {image: '/images/image/15.jpg'},
      ]);
    else {
      setFiles([
        {image: '/images/image/6.jpg'},
        {image: '/images/image/7.jpg'},
        {image: '/images/image/8.jpg'},
        {image: '/images/image/9.jpg'},
        {image: '/images/image/10.jpg'},
        {image: '/images/image/14.jpg'},
        {image: '/images/image/16.jpg'},
        {image: '/images/image/17.jpg'},
        {image: '/images/image/18.jpg'},
        {image: '/images/image/19.jpg'},
      ]);
    }
    setTimeout(() => {
      setIsGet(false);
    }, 2000);
  };
  useEffect(() => {
    const getTrip = async () => {
      setTripInfo({
        id: 2,
        place: '도쿄 여행',
        departing_date: '2023-11-01',
        arriving_date: '2023-11-30',
        users: ['/images/sample.png'],
      });
    };
    const timeoutId = setTimeout(() => {
      getTrip();
    }, 1500);

    // cleanup 함수를 사용하여 컴포넌트가 언마운트되거나 travelNumber가 변경될 때 타이머를 정리합니다.
    return () => clearTimeout(timeoutId);
  }, []);
  useEffect(() => {
    const getTripImage = async () => {
      if (showUserImage) {
      } else {
        const response = await getTripImages(travelNumber);
        console.log(response);
        setFiles(response);
      }
    };
    getTripImage();
  }, [showUserImage, travelNumber, isUpload]);
  if (!tripInfo) {
    return <Uploading text="여행 정보를 가져오는 중" />;
  }
  return (
    <>
      {isUpload && <Uploading text="업로드 중" />}
      {isGet && <Uploading text="나의 사진 가져오는 중" />}
      {isAdd && <AddTripComponent />}
      {isInvite && <InviteTripModal onClick={setIsInvite} />}
      <LogoWrapper>
        <GoToBefore
          onClick={() => {
            navigate(-1);
          }}
        >
          <WiDirectionLeft color="#718fce" />
        </GoToBefore>
        <Logo title={tripInfo.place} />
        <TripDate>{`${tripInfo.departing_date} ~ ${tripInfo.arriving_date}`}</TripDate>
        <InviteTrip onClick={() => setIsInvite(true)}>+</InviteTrip>
      </LogoWrapper>
      <Profile.Wrapper>
        {inTripUser &&
          inTripUser.map((user) => (
            <Profile.Item key={user.email} src={user.imgSrc} />
          ))}
      </Profile.Wrapper>
      <Image.Wrapper>
        {Files.length > 0 ? (
          <FileWrapper>
            {Files.map((data, index) => {
              const {image} = data;
              return (
                <FileAtcBox key={index}>
                  <FileImage>
                    {' '}
                    <FileImageImage src={image} alt="" />
                  </FileImage>
                  {/* <FileDetail>{filename.substring(0, 4) + '...'}</FileDetail> */}
                </FileAtcBox>
              );
            })}
            <GetMine onClick={handleShowMine}>내가 나온 사진 보기</GetMine>
          </FileWrapper>
        ) : (
          <Image.EmptyImage>이미지가 없습니다.</Image.EmptyImage>
        )}
      </Image.Wrapper>
      <Image.AddButton>
        <FileUploadInput
          type="file"
          id="fileupload"
          className="file-upload-input"
          multiple
          onChange={handleFileUpload}
        />
        이미지 추가
      </Image.AddButton>
      <Bottom />
    </>
  );
}
const GoToBefore = styled.div`
  font-size: 30px;
  margin: auto;
  margin-bottom: 0;
  cursor: pointer;
`;
const LogoWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  margin-bottom: 20px;
  display: flex;
  gap: 4px;
`;
const TripDate = styled.div`
  color: #8f8484;
  margin: auto 0;
`;

const InviteTrip = styled.div`
  margin: auto;
  margin-bottom: 0;
  color: #718fce;
  font-size: 30px;
  cursor: pointer;
`;

const Profile = {
  Wrapper: styled.div`
    display: flex;
    gap: 8px;
    width: 100%;
    padding-left: 24px;
  `,
  Item: styled.img`
    width: 45px;
    height: 45px;
    border-radius: 100%;
  `,
};

const Image = {
  Wrapper: styled.div`
    margin: 0 auto;
    margin-top: 12px;
    background: #cbf1f5;
    width: 85%;
    height: 50%;
    border-radius: 20px;
    overflow: auto;
  `,
  AddButton: styled.div`
    margin: 0 auto;
    margin-top: 24px;
    width: 50%;
    height: 48px;
    background: #a6e3e9;
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
  `,
  EmptyImage: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  `,
};

const FileWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 15px;
  padding-bottom: 100px;
  position: relative;
`;
const FileUploadInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
`;

const FileAtcBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 70px;
`;

const FileImage = styled.div`
  width: 70px;
  height: 70px;
  background-size: cover;
  border-radius: 5px;
  background-color: #eaecf1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #475f7b;
`;

const FileImageImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

const GetMine = styled.div`
  width: 150px;
  height: 40px;
  border-radius: 10px;
  background: #3e4c7a;
  color: white;
  position: fixed;
  bottom: 29%;
  z-index: 1;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

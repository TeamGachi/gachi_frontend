import {Header} from './components/Main/Header';
import styled from 'styled-components';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Main from './pages/Main/Main';
import Register from './pages/Main/Register';
import Home from './pages/Home/Home';
import {RecoilRoot} from 'recoil';
import TravelList from './pages/Travel/TravelList';
import TravelItem from './pages/Travel/TravelItem';
import {PrivateRoute} from './utils/PrivateRoute';
function App() {
  return (
    <RecoilRoot>
      <Phone.Layout>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/home" element={<Home />} />
            <Route path="/travel-list" element={<TravelList />} />
            <Route path="/travel-list/:travelNumber" element={<TravelItem />} />
          </Routes>
        </BrowserRouter>
      </Phone.Layout>
    </RecoilRoot>
  );
}

export default App;

const Phone = {
  Layout: styled.div`
    position: relative;
    width: 393px;
    height: 49rem;
    border: 1px solid black;
    border-radius: 1.5rem;
  `,
};

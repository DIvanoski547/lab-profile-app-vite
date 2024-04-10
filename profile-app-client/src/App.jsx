import './App.css';
import Homepage from './pages/Homepage';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users/:userId" element={ <ProfilePage /> } />
      </Routes>
    </>
  );
}

export default App;

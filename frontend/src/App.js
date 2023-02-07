import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Men from './pages/Men'
import Women from './pages/Women'
import Kids from './pages/Kids'
import Homepage from './pages/homepage/Homepage'
import Profile from './pages/Profile'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/Men' element={<Men />} />
          <Route path='/Women' element={<Women />} />
          <Route path='/Kids' element={<Kids />} />
          <Route path='/' element={<Homepage />} />
          <Route path='/Profile' element={<Profile />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

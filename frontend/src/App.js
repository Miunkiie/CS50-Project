import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Homepage from './pages/homepage/Homepage'
import Profile from './pages/Profile'
import CollectionOverview from './components/collectionOverview/CollectionOverview'
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
          <Route path='/collections/:gender' element={<CollectionOverview />} />
          <Route path='/' element={<Homepage />} />
          <Route path='/Profile' element={<Profile />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

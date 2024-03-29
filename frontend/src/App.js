import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Header from './components/header/Header'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Homepage from './pages/homepage/Homepage'
import Profile from './pages/Profile'
import Collections from './pages/collections/Collections';
import Search from './pages/search/Search'
import Page from './pages/product/Product'

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/collections/:gender' element={<Collections />}>
            <Route path='/collections/:gender/:category' element={<Collections />} />
          </Route>
          <Route path='/collections/search/' element={<Search />} />
          <Route path='/product/:name' element={<Page />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

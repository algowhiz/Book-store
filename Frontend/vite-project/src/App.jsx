import React, { useEffect } from 'react'
import Hero from './components/Home/Hero'
import Nav from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Routes, Route } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import BookDetails from './components/ViewBookDetails/BookDetails'
import { authAction } from './store/auth'
import { useDispatch, useSelector } from 'react-redux'
import Favorites from './components/Profile/Favorites'
import UserOrderHistory from './components/Profile/UserOrderHistory'
import Settings from './components/Profile/Settings'
import AllOrders from './pages/AllOrders'
import AddBooks from './pages/AddBooks'
import EditBook from './pages/EditBook'

const App = () => {


  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role")) {
      dispatch(authAction.login());
      dispatch(authAction.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <div className='bg-zinc-800'>

      <Nav />
      <Routes>
        <Route path='/' element={<Hero />} />

        <Route path='/all-books' element={<AllBooks />} />

        <Route path='/cart' element={<Cart />} />

        <Route path='/profile' element={<Profile />}>
          <Route index element={role === 'admin' ? <AllOrders /> : <Favorites />} />
          {role === 'admin' && <Route path='add-book' element={<AddBooks />} />}
          <Route path='orderHistory' element={<UserOrderHistory />} />
          <Route path='settings' element={<Settings />} />
        </Route>
        <Route path='/login' element={<Login />} />

        <Route path='/sign-up' element={<SignUp />} />

        <Route path='/view-book-details/:id' element={<BookDetails />} />

        <Route path='/edit-book/:bookId' element={<EditBook />} />
      </Routes>


      <Footer />
    </div>
  )
}

export default App
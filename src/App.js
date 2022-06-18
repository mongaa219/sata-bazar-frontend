import React from 'react';
import './App.css';
import Navbar from './component/navbar/Navbar';
import { BrowserRouter as Router,Routes, Route  } from 'react-router-dom';
import Home from './pages/Home';
import UserHome from './pages/UserHome';
import Login from './pages/Login';
import Logout from './pages/Logout';
import AddNewData from './pages/AddNewData';
import EditData from './pages/EditData';
// import { Navigate, useParams } from "react-router-dom"
// import About from './pages/about';
// import Events from './pages/events';
// import AnnualReport from './pages/annual';
// import Teams from './pages/team';
// import Blogs from './pages/blogs';
// import SignUp from './pages/signup';

function App() {
  const isAdmin = localStorage.getItem('loginToken');
  // console.log(path);
return (
	<Router>
	  {isAdmin && <Navbar />}
    <Routes>
      <Route path='/' exact element={<UserHome />} />
      <Route path='' exact element={<UserHome />} />
      <Route path='/home'  element={<Home />} />
      <Route path='/login'  element={<Login />} />
      <Route path='/add'  element={<AddNewData />} />
      <Route path='/edit/:id'  element={<EditData />} />
      <Route path='/logout'  element={<Logout />} />
      {/* <Route path='/about' component={About} />
      <Route path='/eventqs' component={Events} />
      <Route path='/annual' component={AnnualReport} />
      <Route path='/team' component={Teams} />
      <Route path='/blogs' component={Blogs} />
      <Route path='/sign-up' component={SignUp} /> */}
    </Routes>
	</Router>
);
}

export default App;

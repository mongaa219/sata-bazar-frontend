import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
return (
	<>
	<Nav className="ns-nav-parent">
		{/* <Bars /> */}

		<NavMenu className="ns-nav-menu">
			<NavLink to='/' className="ns-nav-link">
				User Home
			</NavLink>
			<NavLink to='/home' className="ns-nav-link">
				Home
			</NavLink>
			<NavLink to='/home-city' className="ns-nav-link">
				City Data
			</NavLink>
			<NavLink to='/announcement' className="ns-nav-link">
				Announcement
			</NavLink>
			<NavLink to='/logout' className="ns-nav-link">
				Logout
			</NavLink>
			{/* <NavLink to='/events' >
				Events
			</NavLink>
			<NavLink to='/annual' >
				Annual Report
			</NavLink>
			<NavLink to='/team' >
				Teams
			</NavLink>
			<NavLink to='/blogs' >
				Blogs
			</NavLink>
			<NavLink to='/sign-up' >
				Sign Up
			</NavLink> */}
			{/* Second Nav */}
			{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		{/* <NavBtn>
		<NavBtnLink to='/signin'>Sign In</NavBtnLink>
		</NavBtn> */}
	</Nav>
	</>
);
};

export default Navbar;

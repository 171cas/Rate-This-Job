import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
//import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <li><NavLink exact to="/review">Reviews</NavLink></li>
                <li><NavLink to="/business">Businesses</NavLink></li>
                <ProfileButton user={sessionUser} />
            </>
        );
    } else {
        sessionLinks = (
            <>
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to="/login">Log In</NavLink></li>
                <li><NavLink to="/signup">Sign Up</NavLink></li>
            </>
        );
    }

    return (
        <ul className='horizontal-list'>
            {isLoaded && sessionLinks}
        </ul>
    );
}

export default Navigation;

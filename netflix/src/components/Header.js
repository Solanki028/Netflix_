import React from 'react';
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { API_END_POINT } from '../utils/constant';
import axios from "axios";
import { setUser } from '../redux/userSlice';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setToggle } from '../redux/movieSlice';

const Header = () => {
    const user = useSelector((store) => store.app.user); // Get the logged-in user from Redux store
    const toggle = useSelector((store) => store.movie.toggle); // Check toggle state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Logout handler to log out the user and navigate to the login page
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setUser(null)); // Clear user state in Redux
                localStorage.removeItem('user'); // Clear user data from localStorage
                navigate("/"); // Redirect to the login page
            }
        } catch (error) {
            console.error(error);
            toast.error("Logout failed. Please try again.");
        }
    };
    

    // Toggle handler to switch between Home and Search Movie views
    const toggleHandler = () => {
        dispatch(setToggle());
    };

    return (
        <div className='absolute z-10 flex w-full items-center justify-between px-6 bg-gradient-to-b from-black'>
            {/* Netflix logo */}
            <img 
                className='w-56 cursor-pointer' 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png" 
                alt="Netflix Logo" 
                onClick={() => navigate("/browse")} // Navigate to home page on logo click
            />

            {/* User actions if logged in */}
            {user && (
                <div className='flex items-center'>
                    <IoIosArrowDropdown size="24px" color='white' className="mr-2" />
                    <h1 className='text-lg font-medium text-white'>{user.fullName}</h1>
                    <div className='ml-4'>
                        {/* Logout Button */}
                        <button 
                            onClick={logoutHandler} 
                            className='bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700'>
                            Logout
                        </button>
                        
                        {/* Toggle Button */}
                        <button 
                            onClick={toggleHandler} 
                            className='bg-red-800 text-white px-4 py-2 ml-2 rounded hover:bg-red-700'>
                            {toggle ? "Home" : "Search Movie"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;

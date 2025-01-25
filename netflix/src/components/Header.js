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
            {/* Netflix logo
            <img
                className='w-56 cursor-pointer'
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"
                alt="Netflix Logo"
                onClick={() => navigate("/browse")} // Navigate to home page on logo click
            /> */}

<span
      onClick={() => navigate("/browse")}
      className="netflix-logo"
      style={{
        cursor: "pointer",
        display: "inline-block",
      }}
    >
      <svg
        viewBox="0 0 369.9130434782609 82.46924107443364"
        preserveAspectRatio="xMidYMid meet"
        className="netflix-svg"
        id="daeabfgb"
        style={{ width: "200px", height: "auto" }}
      >
        <defs id="SvgjsDefs1951">
          <linearGradient id="SvgjsLinearGradient1956">
            <stop id="SvgjsStop1957" stopColor="#fe8dc6" offset="0"></stop>
            <stop id="SvgjsStop1958" stopColor="#fed1c7" offset="1"></stop>
          </linearGradient>
        </defs>
        <g
          id="SvgjsG1952"
          featurekey="PG4fjM-0"
          transform="matrix(0.9163250561827153,0,0,0.9163250561827153,-0.00009820177859166396,-0.000020099140445902302)"
          fill="url(#SvgjsLinearGradient1956)"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M81.874,43.388H2.832c-0.643,0-1.163,0.608-1.163,1.358v43.897c0,0.75,0.52,1.357,1.163,1.357h79.042  c0.641,0,1.161-0.607,1.161-1.357V44.746C83.035,43.996,82.515,43.388,81.874,43.388z M65.285,73.613H19.924  c-1.625,0-2.945-1.316-2.945-2.943c0-1.625,1.321-2.942,2.945-2.942h45.361c1.626,0,2.943,1.317,2.943,2.942  C68.229,72.297,66.911,73.613,65.285,73.613z M65.285,59.416H19.924c-1.626,0-2.943-1.317-2.943-2.943s1.317-2.944,2.943-2.944  h45.361c1.624,0,2.943,1.318,2.943,2.944S66.909,59.416,65.285,59.416z M81.874,27.707H2.832c-0.643,0-1.163,0.52-1.163,1.162  v10.075c0,0.642,0.52,1.161,1.163,1.161h79.042c0.641,0,1.161-0.52,1.161-1.161V28.868C83.035,28.226,82.515,27.707,81.874,27.707z   M8.495,38.943l10.073-10.075h14.248L22.743,38.943H8.495z M30.81,38.943l10.075-10.075H55.13L45.056,38.943H30.81z M54.519,38.943  l10.075-10.075H78.84L68.767,38.943H54.519z M80.147,0.961c-0.11-0.632-0.714-1.055-1.346-0.943L0.961,13.743  c-0.631,0.111-1.052,0.715-0.944,1.346l1.751,9.921c0.112,0.632,0.714,1.055,1.347,0.944l77.839-13.726  c0.631-0.112,1.054-0.715,0.944-1.347L80.147,0.961z M2.912,24.809l5.578-0.983l8.171-11.67L38.467,8.31l-7.775,1.371l-8.172,11.67  l7.945-1.402L38.636,8.28l37.38-6.591l-8.171,11.67l12.906-2.275L2.912,24.809z M44.494,17.476l9.32-1.643l8.171-11.67l-9.318,1.644  L44.494,17.476z"
          ></path>
        </g>
        <g
          id="SvgjsG1953"
          featurekey="jxYttZ-0"
          transform="matrix(4.059173989640237,0,0,4.059173989640237,88.69348507663908,-8.753383367602297)"
          fill="#d11b1b"
        >
          <path d="M11.76 6.84 l-7.74 0 l0 4.68 l6.34 0 l0 1.84 l-6.34 0 l0 6.64 l-2.22 0 l0 -15 l9.96 0 l0 1.84 z M16.24 4.619999999999999 l0 15.38 l-2.08 0 l0 -15.38 l2.08 0 z M21.599999999999998 10.12 l0 9.88 l-2.06 0 l0 -9.88 l2.06 0 z M21.7 6.5 c0 0.64 -0.5 1.14 -1.14 1.14 c-0.62 0 -1.12 -0.5 -1.12 -1.14 c0 -0.62 0.5 -1.12 1.12 -1.12 c0.64 0 1.14 0.5 1.14 1.12 z M32.64 10.12 l-3.5 4.94 l3.5 4.94 l-2.36 0 l-2.2 -3.3 l-2.22 3.3 l-2.36 0 l3.52 -4.94 l-3.52 -4.94 l2.36 0 l2.22 3.3 l2.2 -3.3 l2.36 0 z M41.1 17.42 l1.42 1.28 c-0.94 1.04 -2.28 1.5 -3.78 1.5 c-2.84 0 -5.14 -2.18 -5.14 -5.12 s2.3 -5.14 5.14 -5.14 c1.5 0 2.84 0.46 3.78 1.5 l-1.42 1.28 c-0.58 -0.78 -1.42 -1.08 -2.36 -1.08 c-1.7 0 -3.08 1.42 -3.08 3.44 c0 2 1.38 3.44 3.08 3.44 c0.94 0 1.78 -0.3 2.36 -1.1 z M53.86 14.3 l0 5.7 l-2.06 0 l0 -5.5 c0 -2 -0.62 -2.88 -2.32 -2.88 c-1.92 0 -2.7 1.34 -2.7 3.08 l0 5.3 l-2.06 0 l0 -15 l2.06 0 l0 6.72 c0.28 -0.88 1.52 -1.68 2.7 -1.76 c2.68 -0.2 4.38 1.1 4.38 4.34 z M58.82 10.12 l0 9.88 l-2.06 0 l0 -9.88 l2.06 0 z M58.92 6.5 c0 0.64 -0.5 1.14 -1.14 1.14 c-0.62 0 -1.12 -0.5 -1.12 -1.14 c0 -0.62 0.5 -1.12 1.12 -1.12 c0.64 0 1.14 0.5 1.14 1.12 z M63.99999999999999 4.619999999999999 l0 15.38 l-2.08 0 l0 -15.38 l2.08 0 z M69.28 4.619999999999999 l0 15.38 l-2.08 0 l0 -15.38 l2.08 0 z"></path>
        </g>
      </svg>
    </span>


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

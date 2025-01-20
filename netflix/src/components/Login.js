import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from "axios";
import { API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from '../redux/userSlice';


const Login = () => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.app.isLoading);

    // Check if user is already logged in
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch(setUser(user));
            navigate("/browse");
        }
    }, [dispatch, navigate]);

    const toggleLogin = () => setIsLogin(prev => !prev);

    const handleRegister = async (user) => {
        try {
            const response = await axios.post(`${API_END_POINT}/register`, user, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            if (response?.data?.success) {
                const userData = response.data.user;
                localStorage.setItem('user', JSON.stringify(userData));
                dispatch(setUser(userData));
                toast.success("Signup successful! Redirecting...");
                navigate('/browse');
            } else {
                throw new Error(response?.data?.message || "Unexpected error during registration.");
            }
        } catch (error) {
            const message = error.response?.data?.message || "An unexpected error occurred.";
            toast.error(message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));

        const user = isLogin ? { email, password } : { fullName, email, password };
        try {
            if (isLogin) {
                // Login API call
                const response = await axios.post(`${API_END_POINT}/login`, user, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });

                if (response?.data?.success) {
                    const userData = response.data.user;
                    localStorage.setItem('user', JSON.stringify(userData));
                    dispatch(setUser(userData));
                    toast.success("Login successful! Redirecting...");
                    navigate("/browse");
                } else {
                    throw new Error(response?.data?.message || "Unexpected error during login.");
                }
            } else {
                await handleRegister(user);
            }
        } catch (error) {
            const message = error.response?.data?.message || "An unexpected error occurred.";
            toast.error(message);
        } finally {
            dispatch(setLoading(false));
            setFullName("");
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div>
            <Header />
            {/* Background image */}
            <div className="absolute">
                <img
                    className="w-[100vw] h-[100vh] bg-cover"
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
                    alt="Netflix Banner"
                />
            </div>

            {/* Login/Signup Form */}
            <form
                onSubmit={handleSubmit}
                className="absolute flex flex-col w-3/12 p-12 my-36 left-0 right-0 mx-auto items-center justify-center rounded-md bg-black opacity-90"
            >
                <h1 className="text-3xl text-white mb-5 font-bold">{isLogin ? "Login" : "Signup"}</h1>
                <div className="flex flex-col">
                    {/* Full name field for Signup */}
                    {!isLogin && (
                        <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            type="text"
                            placeholder="Full Name"
                            className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
                            disabled={isLoading}
                        />
                    )}
                    {/* Email field */}
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
                        disabled={isLoading}
                    />
                    {/* Password field */}
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
                        disabled={isLoading}
                    />
                    {/* Submit button */}
                    <button
                        type="submit"
                        className="bg-red-600 mt-6 p-3 text-white rounded-sm font-medium"
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : isLogin ? "Login" : "Signup"}
                    </button>
                    {/* Toggle between Login and Signup */}
                    <p className="text-white mt-2">
                        {isLogin ? "New to Netflix?" : "Already have an account?"}
                        <span
                            onClick={toggleLogin}
                            className="ml-1 text-blue-900 font-medium cursor-pointer"
                        >
                            {isLogin ? "Signup" : "Login"}
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuthRedirect = () => {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');  
        }
    }, [user, navigate]);
};

export default useAuthRedirect;

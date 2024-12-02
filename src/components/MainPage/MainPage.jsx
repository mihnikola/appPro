import React, { useContext } from 'react';
import BackArrow from '../BackArrow/BackArrow';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { getWorkPlaces } from '../../context/WorkPlaceSlice';
const MainPage = () => {
    const { user, logout } = useContext(AuthContext);
    const dispatch = useDispatch();

    const loadOperationsHandler = () => {
        dispatch(getWorkPlaces());
    }

    if (user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className='mb-20 items-end flex'>
                <BackArrow onChange={logout} value="Odjava" />
                </div>
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Dobrodošli, gosn. {user.username}</h1>
                <p className="text-lg text-center text-gray-600 mb-6">
                    Istražite naše funkcije i uživajte u iskustvu!
                </p>
                <button onClick={loadOperationsHandler} className="px-6 py-3 bg-grey-500 text-black font-semibold rounded-lg shadow transition hover:bg-[#212121] hover:text-[#ffffff] ">
                    Započnite!
                </button>
            </div>

        );
    }
};
export default MainPage;
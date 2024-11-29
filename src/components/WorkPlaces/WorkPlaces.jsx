import React, { useContext } from 'react';
import BackArrow from '../BackArrow/BackArrow';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { removeWorkPlaces } from "../../context/WorkPlaceSlice";
import { getOperations } from "../../context/OperationsSlice";

const WorkPlaces = () => {
    const { logout } = useContext(AuthContext);
    const { workPlaces } = useSelector((state) => state.workPlaces);
    const dispatch = useDispatch();
    const removeWorkPlacesHandler = () => {
        dispatch(removeWorkPlaces());
        logout();
    }
    const loadNextOperationsDataHandler = (data) => {
        dispatch(getOperations(data));
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <BackArrow onChange={removeWorkPlacesHandler} value="Odjava" />
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Radna mesta</h2>
            <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
                {workPlaces.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => loadNextOperationsDataHandler(item)}
                        className="bg-green-500 text-white font-bold text-2xl py-10 rounded-lg shadow-md hover:bg-green-700 transition"
                    >
                        {item.place_title}
                    </button>
                ))}
            </div>
        </div>
    );
};
export default WorkPlaces;
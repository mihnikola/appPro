import React from 'react';
import backward from "../../assets/images/circle-triangle-left-fill-svgrepo-com.svg";
import signout from "../../assets/images/logout-svgrepo-com.svg";

const BackArrow = ({ onChange, value }) => {
    return (
        <div className="text-2l font-bold  items-start w-4/5  cursor-pointer">
            <button
                onClick={onChange}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            >
                {value !== "Odjava" ? <img src={backward} alt="backward" /> : <img src={signout} alt="signout" />}
                <span>{value ? value : "Nazad"}</span>
            </button>
        </div>
    );
};

export default BackArrow;

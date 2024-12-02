import React from "react";
import forward from "../../assets/images/circle-triangle-right-fill-svgrepo-com.svg";

const ForwardArrow = ({ onChange }) => {
  return (
    <div className="text-2xl font-bold cursor-pointer">
      <button
        onClick={onChange}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
      >
       
        <img src={forward} alt="forward" />

        <span>Dalje</span>
      </button>
    </div>
  );
};

export default ForwardArrow;

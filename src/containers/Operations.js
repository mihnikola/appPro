import React, { useContext } from "react";
import NextOperations from "../components/NextOperations/NextOperations";
import CurrentOperations from "../components/CurrentOperations/CurrentOperations";
import { ToggleContext } from "../context/ToggleProvider";

const Operations = () => {
  const { isOpen } = useContext(ToggleContext);

  return (
    <>
      {!isOpen && <NextOperations />}
      {isOpen && <CurrentOperations />}
    </>
  );
};

export default Operations;

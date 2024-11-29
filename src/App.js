import React, { useContext } from "react";
import Login from "./components/Login/Login";
import MainPage from "./components/MainPage/MainPage";
import { useSelector } from "react-redux";
import WorkPlaces from "./components/WorkPlaces/WorkPlaces";
import { AuthContext } from "./context/AuthContext";
import { ToggleProvider } from "./context/ToggleProvider";
import Operations from "./containers/Operations";

const App = () => {
  const { operations } = useSelector((state) => state.operations);
  const { workPlaces } = useSelector((state) => state.workPlaces);
  const { user } = useContext(AuthContext);

  return (
    <>
      {!user && <Login />}
      {user && workPlaces.length === 0 && <MainPage />}
      {user && workPlaces.length > 0 && operations?.length === 0 && (
        <WorkPlaces />
      )}
      {user && workPlaces.length > 0 && operations?.length > 0 && (
      <ToggleProvider>
        <Operations />
      </ToggleProvider>
      )}
    </>
  );
};

export default App;

import { configureStore } from "@reduxjs/toolkit";
import operationReducer from '../context/OperationsSlice';
import workPlacesReducer from '../context/WorkPlaceSlice';
import employeesReducer from '../context/EmployeesSlice';

export const store = configureStore({
    reducer: {
        operations: operationReducer,
        workPlaces: workPlacesReducer,
        employees: employeesReducer,
    },
  })
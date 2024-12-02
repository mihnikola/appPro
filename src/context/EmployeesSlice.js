import { createSlice } from "@reduxjs/toolkit";
import { employeesData } from "../data/employeesData";

const initialState = {
  employees: [],
  selectEmployees: [],
  selectedEmployees: []
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    getEmployees(state, action) {
      state.employees = employeesData;
    },
    setSelectedEmployees(state, action) {
      const { item, checked } = action.payload;
      console.log("item", item, checked);
      const selectedEmployees = [...state.selectEmployees];
      if (checked) {
        selectedEmployees.push(item);
        state.selectEmployees = selectedEmployees;
      } else {
        const unSelected = selectedEmployees.filter(
          (employee) => employee.id !== item.id
        );
        state.selectEmployees = unSelected;
      }
    },
    submitSelectEmployees(state, action){
      state.selectedEmployees = action.payload;
    }
  },
});

export const { getEmployees, setSelectedEmployees, submitSelectEmployees } = employeesSlice.actions;

export default employeesSlice.reducer;

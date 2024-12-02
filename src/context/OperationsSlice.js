import { createSlice } from "@reduxjs/toolkit";
import { operationsData } from "../data/operationsData";

const initialState = {
  operations: [],
  workPlace: {},
  currentOperations: [],
  idLoading: true,
};

const operationSlice = createSlice({
  name: "operations",
  initialState,
  reducers: {
    getOperations(state, action) {
      console.log("first", action.payload);
      state.operations = operationsData;
      state.workPlace = action.payload;
    },
    addOperation(state, action) {
      const { operationData, inputValue } = action.payload;
      const now = new Date();
      const dateString =
        now.toISOString().split("T")[0] +
        " " +
        now.toISOString().split("T")[1].substring(0, 8);

      const data = {
        ...operationData,
        vreme_pocetka: dateString,
        kolicina_dela: Number(inputValue),
      };
      state.currentOperations.push(data);
    },
    submitOperation(state, action) {
      state.currentOperations = state.currentOperations.filter(
        (item) => item.radni_nalog !== action.payload.radni_nalog
      );
      
    },
    // backCurrentOperation(state, action) {
    //   state.currentOperations = state.currentOperations.filter(
    //     (item) => item.radni_nalog !== action.payload.radni_nalog
    //   );
    // },
    removeOperations(state) {
      state.operations = [];
      state.workPlace = {};
    },
    updateCurrentOperation(state, action) {
      const index = state.currentOperations.findIndex(
        (item) => item.id === action.payload.id
      );
      state.currentOperations[index] = action.payload;
    },
  },
});

export const {
  removeOperations,
  getOperations,
  addOperation,
  backCurrentOperation,
  updateCurrentOperation,
  submitOperation,
} = operationSlice.actions;

export default operationSlice.reducer;

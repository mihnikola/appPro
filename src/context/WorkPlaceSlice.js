import { createSlice } from "@reduxjs/toolkit";
import { places } from "../data/workPlaces";

const initialState = {
    workPlaces: []
};

const workPlacesSlice = createSlice({
  name: "workPlaces",
  initialState,
  reducers: {
    getWorkPlaces(state, action){
      state.workPlaces = places;
    },
    removeWorkPlaces(state, action){
      state.workPlaces = [];
    },
  },
});

export const { getWorkPlaces, removeWorkPlaces } = workPlacesSlice.actions;

export default workPlacesSlice.reducer;

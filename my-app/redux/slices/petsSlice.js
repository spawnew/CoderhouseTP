import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Nota: No usamos Firestore, usamos SQLite que viene de useSQLiteContext

const petsSlice = createSlice({
  name: "pets",
  initialState: {
    pets: [],
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    setPets: (state, action) => {
      state.pets = action.payload;
    },
    addPet: (state, action) => {
      state.pets.unshift(action.payload);
    },
    removePet: (state, action) => {
      state.pets = state.pets.filter(pet => pet.id !== action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    }
  }
});

export const { setPets, addPet, removePet, clearError, clearSuccess } = petsSlice.actions;
export default petsSlice.reducer;
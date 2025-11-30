import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0, // Estado inicial
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1; // Incrementar el contador
    },
    decrement: (state) => {
      state.count -= 1; // Decrementar el contador
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload; // Incrementar por un valor recibido
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions; // Exportar las acciones
export default counterSlice.reducer; // Exportar el reducer
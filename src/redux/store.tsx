import { configureStore, createSlice } from '@reduxjs/toolkit';


// Crea un slice para manejar el estado de los tamaños
const sizeSlice = createSlice({
  name: 'sizes',
  initialState: [] as string[],
  reducers: {
    addSize: (state, action) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
    removeSize: (state, action) => {
      return state.filter(size => size !== action.payload);
    }
  }
});

// Configura el store
const store = configureStore({
  reducer: {
    sizes: sizeSlice.reducer,
  }
});

// Exporta las acciones y el store
export const { addSize, removeSize } = sizeSlice.actions;
export default store;

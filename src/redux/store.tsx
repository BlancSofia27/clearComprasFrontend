import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define el tipo para el estado de los tamaños
type SizeState = string[];

// Crea un slice para manejar el estado de los tamaños
const sizeSlice = createSlice({
  name: 'sizes',
  initialState: [] as SizeState,
  reducers: {
    addSize: (state, action: PayloadAction<string>) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
    removeSize: (state, action: PayloadAction<string>) => {
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

// Exporta los tipos de estado y despachador
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Exporta las acciones y el store
export const { addSize, removeSize } = sizeSlice.actions;
export default store;


import { configureStore, createSlice } from "@reduxjs/toolkit"
import itemsSlice from "./counter";
import userSlice from "./privacy";
import quantitySlice from "./quantitycounter";
const itemStore = configureStore({
    reducer: { items: itemsSlice.reducer, userName: userSlice.reducer, quantity: quantitySlice.reducer },
});



export default itemStore;
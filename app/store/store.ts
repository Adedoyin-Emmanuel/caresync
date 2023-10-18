import { configureStore } from "@reduxjs/toolkit";


//import other reducerers


const store = configureStore({
    reducer: {},
    // middleware: (getDefaultMiddlware) => {
    //     getDefaultMiddlware().concat(),
            
    // },
    devTools: true
});

export default store;

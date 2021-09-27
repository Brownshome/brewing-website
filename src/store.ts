// The redux data store for the application
import { configureStore } from "@reduxjs/toolkit";
import databaseReducer from "./database";

const store = configureStore({
	reducer: {
		database: databaseReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
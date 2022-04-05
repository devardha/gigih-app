import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./reducers/searchReducer";

export default configureStore({
	reducer: {
		search: searchReducer,
	},
});

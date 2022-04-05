import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
	name: "search",
	initialState: {
		q: "",
	},
	reducers: {
		updateQuery(state, action) {
			state.q = action.payload;
		},
	},
});

export const { updateQuery } = SearchSlice.actions;
export default SearchSlice.reducer;

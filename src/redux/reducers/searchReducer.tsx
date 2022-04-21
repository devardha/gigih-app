import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
	name: 'search',
	initialState: {
		query: '',
		results: [],
	},
	reducers: {
		loadSongs(state, action) {
			state.results = action.payload;
		},
	},
});

export const { loadSongs } = SearchSlice.actions;
export default SearchSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const SongSlice = createSlice({
	name: 'song',
	initialState: {
		selectedSongs: [],
	},
	reducers: {
		addSong(state, action) {
			state.selectedSongs = action.payload;
		},
	},
});

export const { addSong } = SongSlice.actions;
export default SongSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export interface State {
	selectedSongs: any[];
}

const SongSlice = createSlice({
	name: 'song',
	initialState: <State>{
		selectedSongs: [],
	},
	reducers: {
		addSong: (state, action) => {
			if (state.selectedSongs.includes(action.payload)) {
				const filtered = state.selectedSongs.filter(
					(item) => item !== action.payload
				);
				state.selectedSongs = filtered;
			} else {
				state.selectedSongs = [...state.selectedSongs, action.payload];
			}
		},
	},
});

export const { addSong } = SongSlice.actions;
export default SongSlice.reducer;

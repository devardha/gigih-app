import { createSlice } from '@reduxjs/toolkit';
import { Song } from '../../types/types';

export interface State {
	selectedSongs: Song[];
}

const SongSlice = createSlice({
	name: 'song',
	initialState: <State>{
		selectedSongs: [],
	},
	reducers: {
		addSong: (state, action) => {
			if (
				state.selectedSongs.filter(
					(song) => song.href === action.payload.href
				).length > 0
			) {
				const filtered = state.selectedSongs.filter(
					(item) => item.href !== action.payload.href
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

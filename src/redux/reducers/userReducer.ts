import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
	name: 'user',
	initialState: {
		user: {},
		accessToken: '',
	},
	reducers: {
		loadToken(state, action) {
			state.accessToken = action.payload;
		},
		loadUser(state, action) {
			state.user = action.payload;
		},
	},
});

export const { loadToken, loadUser } = UserSlice.actions;
export default UserSlice.reducer;

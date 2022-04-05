import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
	name: "user",
	initialState: {
		user: {},
		access_token: "",
	},
	reducers: {
		loadToken(state, action) {
			state.access_token = action.payload;
		},
		loadUser(state, action) {
			state.user = action.payload;
		},
	},
});

export const { loadToken, loadUser } = UserSlice.actions;
export default UserSlice.reducer;

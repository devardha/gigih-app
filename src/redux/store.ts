import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducers/searchReducer';
import songReducer from './reducers/songReducer';
import userReducer from './reducers/userReducer';

export default configureStore({
	reducer: {
		user: userReducer,
		song: songReducer,
		search: searchReducer,
	},
});

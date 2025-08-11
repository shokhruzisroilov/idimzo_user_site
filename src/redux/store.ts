import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import newsReducer from './slices/newsSlice'
import userReducer from './slices/userSlice'
import notificationReducer from './slices/notificationSlice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		news: newsReducer,
		user: userReducer,
		notification: notificationReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

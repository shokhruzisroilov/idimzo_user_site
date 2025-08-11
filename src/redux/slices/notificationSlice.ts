import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Content {
	en: string
	kaa: string
	ru: string
	uz: string
	uzc: string
}

interface Images {
	en: string | null
	kaa: string | null
	ru: string | null
	uz: string | null
	uzc: string | null
}

interface NotificationState {
	content: Content | null
	createdAt: string | null
	endDate: string | null
	images: Images | null
	startDate: string | null
	loading: boolean
	error: string | null
}

const initialState: NotificationState = {
	content: null,
	createdAt: null,
	endDate: null,
	images: null,
	startDate: null,
	loading: false,
	error: null,
}

// Notification ma'lumotlari, barcha date maydonlari string ISO formatda bo'lishi kerak!
export interface NotificationData {
	content: Content | null
	createdAt: string | null
	endDate: string | null
	images: Images | null
	startDate: string | null
}

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setNotification(state, action: PayloadAction<NotificationData | null>) {
			const data = action.payload
			if (!data) {
				state.content = null
				state.createdAt = null
				state.endDate = null
				state.images = null
				state.startDate = null
				return
			}

			state.content = data.content ?? null
			state.createdAt = data.createdAt ?? null
			state.endDate = data.endDate ?? null
			state.images = data.images ?? null
			state.startDate = data.startDate ?? null
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
		},
	},
})

export const { setNotification, setLoading, setError } =
	notificationSlice.actions
export default notificationSlice.reducer

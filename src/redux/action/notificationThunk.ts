import { AppDispatch } from '../store'
import {
	setNotification,
	setLoading,
	setError,
} from '../slices/notificationSlice'
import { subscribeToNotification } from '@/services/notificationService'

export const startNotificationListener =
	(docId: string) => (dispatch: AppDispatch) => {
		dispatch(setLoading(true))

		try {
			const unsubscribe = subscribeToNotification(docId, data => {
				if (data) {
					// Firestore Timestamps ni stringga aylantiramiz!
					const normalizedData = {
						content: data.content ?? null,
						images: data.images ?? null,
						createdAt: data.createdAt
							? data.createdAt.toDate().toISOString()
							: null,
						endDate: data.endDate ? data.endDate.toDate().toISOString() : null,
						startDate: data.startDate
							? data.startDate.toDate().toISOString()
							: null,
					}
					dispatch(setNotification(normalizedData))
					dispatch(setError(null))
				} else {
					dispatch(setNotification(null))
					dispatch(setError('Notification not found'))
				}
				dispatch(setLoading(false))
			})

			return unsubscribe
		} catch (error: unknown) {
			if (error instanceof Error) {
				dispatch(setError(error.message))
			} else {
				dispatch(setError('Unknown error occurred'))
			}
			dispatch(setLoading(false))
		}
	}

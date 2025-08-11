import { db } from '@/firebase/firebase'
import { doc, onSnapshot, DocumentData } from 'firebase/firestore'

export const subscribeToNotification = (
	docId: string,
	callback: (data: DocumentData | null) => void
) => {
	const unsub = onSnapshot(doc(db, 'notifications', docId), docSnap => {
		if (docSnap.exists()) {
			callback(docSnap.data())
		} else {
			callback(null)
		}
	})

	return unsub
}

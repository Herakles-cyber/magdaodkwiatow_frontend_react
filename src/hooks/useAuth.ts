import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/Firebase/firebase'

const useAuth = () => {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
			setUser(firebaseUser)
			setLoading(false)
		})

		// Clean up listener on unmount
		return () => unsubscribe()
	}, [])

	return { user, loading, isLoggedIn: !!user }
}

export default useAuth

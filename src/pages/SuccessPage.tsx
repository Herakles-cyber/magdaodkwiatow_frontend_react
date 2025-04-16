import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '@/Firebase/firebase'
import useAuth from '@/hooks/useAuth'
import { useEffect } from 'react'

const SuccessPage = () => {
	const navigate = useNavigate()
	const { isLoggedIn, loading } = useAuth()

	useEffect(() => {
		if (!loading && !isLoggedIn) {
			navigate('/login')
		}
	}, [isLoggedIn, loading, navigate])

	const handleLogout = async () => {
		await signOut(auth)
		navigate('/login')
	}

	if (loading) {
		return <p>Ładowanie...</p>
	}

	return (
		<div>
			<h2>✅ Udane logowanie!</h2>
			<button onClick={handleLogout}>Wyloguj się</button>
		</div>
	)
}

export default SuccessPage

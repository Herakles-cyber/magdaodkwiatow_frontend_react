import GoogleLoginButton from '@/components/auth/GoogleLoginButton'
import useAuth from '@/hooks/useAuth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRedirectResult } from 'firebase/auth'
import { auth } from '@/Firebase/firebase'

const LoginPage = () => {
	const { isLoggedIn } = useAuth()
	const navigate = useNavigate()

	// Obsługa redirectu po zalogowaniu (np. na mobilnych)
	useEffect(() => {
		getRedirectResult(auth)
			.then(result => {
				if (result?.user) {
					const user = result.user
					localStorage.setItem(
						'user',
						JSON.stringify({
							name: user.displayName,
							email: user.email,
							uid: user.uid,
						})
					)
					navigate('/success')
				}
			})
			.catch(error => {
				console.error('Błąd po redirect:', error)
			})
	}, [navigate])

	// Obsługa klasycznego zalogowania
	useEffect(() => {
		if (isLoggedIn) {
			navigate('/success')
		}
	}, [isLoggedIn, navigate])

	return (
		<div>
			<h2>Zaloguj się przez Google</h2>
			<GoogleLoginButton />
		</div>
	)
}

export default LoginPage

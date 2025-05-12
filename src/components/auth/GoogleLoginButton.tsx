import { signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/Firebase/firebase'
import { useState } from 'react'
import styles from './GoogleLoginButton.module.css'

const GoogleLoginButton: React.FC = () => {
	const [error, setError] = useState<string | null>(null)

	const handleGoogleLogin = async () => {
		const provider = new GoogleAuthProvider()
		provider.setCustomParameters({ prompt: 'select_account' })

		try {
			const result = await signInWithPopup(auth, provider)
			const user = result.user

			localStorage.setItem(
				'user',
				JSON.stringify({
					name: user.displayName,
					email: user.email,
					uid: user.uid,
				})
			)

			setError(null)
			console.log('Zalogowano:', user.displayName)
		} catch (err: any) {
			console.error('Błąd popup:', err)

			// Jeśli błąd dotyczy środowiska bez obsługi popupów — fallback
			if (
				err.code === 'auth/operation-not-supported-in-this-environment' ||
				err.code === 'auth/popup-blocked' ||
				err.code === 'auth/popup-closed-by-user'
			) {
				try {
					await signInWithRedirect(auth, provider)
				} catch (redirectErr) {
					console.error('Błąd redirect:', redirectErr)
					setError('Nie udało się przekierować do logowania.')
				}
			} else {
				setError('Wystąpił błąd podczas logowania.')
			}
		}
	}

	return (
		<div>
			<button onClick={handleGoogleLogin} className={styles.button}>
				Zaloguj się przez Google
			</button>
			{error && <p className={styles.error}>{error}</p>}
		</div>
	)
}

export default GoogleLoginButton
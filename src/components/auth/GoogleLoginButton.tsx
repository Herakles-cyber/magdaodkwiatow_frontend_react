import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/Firebase/firebase'
import { useState } from 'react'
import styles from './GoogleLoginButton.module.css'

const GoogleLoginButton: React.FC = () => {
	const [error, setError] = useState<string | null>(null)

	const handleGoogleLogin = async () => {
		try {
			// Tworzymy nowy provider i ustawiamy, by zawsze pytał o konto
			const provider = new GoogleAuthProvider()
			provider.setCustomParameters({ prompt: 'select_account' })

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
		} catch (err) {
			console.error(err)
			setError('Wystąpił błąd podczas logowania.')
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

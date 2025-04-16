import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyCrdouW1PgfAk-O63ah7JujB8oGwQ6tU7s',
	authDomain: 'magdaodkwiatow-shop.firebaseapp.com',
	projectId: 'magdaodkwiatow-shop',
	storageBucket: 'magdaodkwiatow-shop.firebasestorage.app',
	messagingSenderId: '1024512694225',
	appId: '1:1024512694225:web:2753771a726502d71832f0',
	measurementId: 'G-YX5MFSLDXL',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

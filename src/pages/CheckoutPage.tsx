import useAuth from '../hooks/useAuth'
import { useCart } from '../context/CartContext'
import { db } from '../Firebase/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export default function CheckoutPage() {
	const { user } = useAuth()
	const { cartItems } = useCart()
	const navigate = useNavigate()

	const submitOrder = async () => {
		try {
			if (!user) {
				alert('Musisz być zalogowany, aby złożyć zamówienie.')
				return
			}

			await addDoc(collection(db, 'orders'), {
				uid: user.uid,
				email: user.email,
				items: cartItems,
				createdAt: serverTimestamp(),
				status: 'oczekujące',
			})

			navigate('/success')
		} catch (error) {
			console.error('Błąd podczas składania zamówienia:', error)
			alert('Wystąpił błąd przy składaniu zamówienia.')
		}
	}

	return (
		<div>
			<h1>Finalizacja zamówienia</h1>
			<button onClick={submitOrder}>Zamawiam</button>
		</div>
	)
}

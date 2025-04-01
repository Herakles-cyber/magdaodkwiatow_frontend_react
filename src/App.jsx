import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import NavMobile from './components/NavMobile'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
	return (
		<BrowserRouter>
			<NavMobile />
			{/* <Header /> */}
			<AppRoutes />
			<Footer />
		</BrowserRouter>
	)
}

export default App

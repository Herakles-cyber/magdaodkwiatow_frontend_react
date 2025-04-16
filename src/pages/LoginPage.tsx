import GoogleLoginButton from '@/components/auth/GoogleLoginButton'
import useAuth from '@/hooks/useAuth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

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

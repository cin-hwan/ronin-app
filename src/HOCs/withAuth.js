import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthProvider"

const withAuth = (Component) => {
    const AuthenticatedComponent = (props) => {
        const { isInitialized, user } = useAuth()
        const navigate = useNavigate()

        useEffect(() => {
            if (isInitialized && !user) {
                navigate('/signin')
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isInitialized, user])

        if(!isInitialized || !user) return null

        return <Component {...props} />
    }

    return AuthenticatedComponent
}

export default withAuth
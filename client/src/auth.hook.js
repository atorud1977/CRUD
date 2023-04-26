import { useState, useEffect, useCallback} from "react"

export const useAuth = () => {
    const [token,setToken] = useState(null)
    const [userId,setUserId] = useState(null)
    const [isReady,setIsReady] = useState(false)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem('userData', JSON.stringify({
            userId: id,
            token: jwtToken
        }))
    },[])

    const logout = () => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem('userData')
    }

    useEffect(() => {
       const data = JSON.parse(localStorage.getItem('userData'))
       if(data && data.token){
        login(data.token, data.userId)
       }
       setIsReady(true)
    }, [login])

    return {login, logout, token, userId, isReady}
}

//TOKEN eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQzNzFiZGJlZTVhZjI2ZmRhYWMyYzgiLCJpYXQiOjE2ODIxNDg2ODMsImV4cCI6MTY4MjE1MjI4M30.mikhaMsR2CQid6tOiX-_S-WdzYqZI6ImaJg-UUoyTco ID 644371bdbee5af26fdaac2c8
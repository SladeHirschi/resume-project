import { useEffect } from "react"

const DestroyJWT = () => {
    useEffect(() => {
        window.sessionStorage.removeItem('JWT')
    }, [])

    return null;
}

export default DestroyJWT
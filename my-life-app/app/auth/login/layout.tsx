import LoginPage from './page'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Login - My Life"
}

function layout() {
    return (
        <LoginPage />
    )
}

export default layout
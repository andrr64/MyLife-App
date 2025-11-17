import { Metadata } from 'next'
import RegisterPage from './page'

export const metadata: Metadata = {
    title: "Register - My Life"
}

function layout() {
  return (
    <RegisterPage/>
  )
}

export default layout
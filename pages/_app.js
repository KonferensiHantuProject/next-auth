import '@/styles/globals.css'
import AuthProvider from './Provider'

export default function App({ Component, pageProps }) {
  return(
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

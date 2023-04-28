import '@/styles/globals.css'
import '@/styles/nav.css';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignIn } from '@clerk/nextjs';

export default function App({ Component, pageProps }) {
  return( 
  <ClerkProvider {...pageProps}>
	<Component {...pageProps} />
  </ClerkProvider>
  )
}

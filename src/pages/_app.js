import '@/styles/globals.css'
import '@/styles/nav.css';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import Home from '.';
const publicPages = ["/", "/login", "/logout"];


export default function App({ Component, pageProps }) {
	const router = useRouter();
	const pathname  = router.pathname;
	const isPublicPage = publicPages.includes(pathname);
  return( 
  <ClerkProvider {...pageProps}>
	{isPublicPage ? (
			<Component {...pageProps} />
			) : (
			<>
				<SignedIn>
				<Component {...pageProps} />
				</SignedIn>
				<SignedOut>
				<Home />
				</SignedOut>

			</>
			)}
  </ClerkProvider>
  )
}

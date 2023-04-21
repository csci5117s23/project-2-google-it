
import { useRouter } from 'next/router'

export default function signOut(){
	const router = useRouter()

	const doIt = async () => {
		await window.Clerk.signOut().then(() =>
			router.push("/")
		)
	}
	doIt();
}


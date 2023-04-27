import { SignedIn, useClerk } from "@clerk/clerk-react";
import { useRouter } from 'next/router'

export default function LogoutButton() {
    const { signOut } = useClerk();
    const router = useRouter();
    function customSignOut(){
        const logout = async () => {
            await signOut();
            router.push("/");
        }
        logout();
        
    }
    return <>
    {}
    <SignedIn>
        <button className="logoutButton" onClick={customSignOut}> <img class="arrow" src="https://icons.veryicon.com/png/o/miscellaneous/basic-monochrome-icon/sign-out-54.png"></img>      Log Out</button>
     </SignedIn>
    </>
}

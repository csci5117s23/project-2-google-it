// import { useAuth } from '@clerk/nextjs';
import BeverageList from '@/components/beveragelist'
export default function List() {
  // const { isLoaded, userId, sessionId, getToken} = useAuth();

  return (
    <>
      <BeverageList listItems={[1,2,3]}></BeverageList>
    </>
  )
}

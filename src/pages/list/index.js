// import { useAuth } from '@clerk/nextjs';
import BeverageList from '@/components/beveragelist'
export default function List() {
  // const { isLoaded, userId, sessionId, getToken} = useAuth();

  const dummyData = [
    {bevName: "Tequila Sunrise", locName: "Sal's Bar", rating: "4.5", createdOn: new Date()}, 
    {bevName: "Blue Fishbowl", locName: "Burrito Loco", rating: "5.0", createdOn: new Date()},
    {bevName: "Pink Fishbowl", locName: "Burrito Loco", rating: "4.3", createdOn: new Date()}, 
  ];
  return (
    <>
      <BeverageList listItems={dummyData}></BeverageList>
    </>
  )
}

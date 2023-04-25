// import { useAuth } from '@clerk/nextjs';
import NavBar from '@/components/nav';
import BeverageList from '@/components/beveragelist'
export default function List() {
  // const { isLoaded, userId, sessionId, getToken} = useAuth();

  const dummyData = [
    {bevName: "Tequila Sunrise", locName: "Sal's Bar", rating: 4.5, createdOn: "2023-04-14T23:27:25.145Z"}, 
    {bevName: "Blue Fishbowl", locName: "Burrito Loco", rating: 5.0, createdOn: "2023-04-14T23:27:25.145Z"},
    {bevName: "Pink Fishbowl", locName: "Burrito Loco", rating: 4.3, createdOn: "2023-04-14T23:27:25.145Z"}, 
  ];
  return (
    <>
      <BeverageList listItems={dummyData}></BeverageList>
      <NavBar></NavBar>
    </>
  )
}

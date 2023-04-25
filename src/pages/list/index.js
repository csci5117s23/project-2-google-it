// import { useAuth } from '@clerk/nextjs';
import React, {useEffect, useState} from 'react'
import BeverageList from '@/components/beveragelist'

// TODO: REMOVE AFTER AUTH
const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_BACKEND_API_KEY

export default function List() {
  // const { isLoaded, userId, sessionId, getToken} = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    //TODO: NEEDS AUTH
		const fetchData = async () => {
			console.log(API_ENDPOINT + "/bevEntry")
			const response = await fetch(API_ENDPOINT + "/bevEntry", {
				'method':'GET',
				'headers': {'x-apikey': API_KEY}
			})
			const data = await response.json()

			setData(data) 
		}
		fetchData();
	}, []);

  return (
    <>
      <BeverageList listItems={data}></BeverageList>
    </>
  )
}

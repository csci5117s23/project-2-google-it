import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useAuth } from "@clerk/nextjs";
const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export default function ViewEntry(){
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(null);
	const { isLoaded, userId, sessionId, getToken } = useAuth();
	const router = useRouter()
	const { id } = router.query
	

	useEffect(() => {
		
		const fetchData = async () => {
			const token = await getToken({template: "BevaryTemplate"})
			console.log(id)
			const response = await fetch(API_ENDPOINT + "/bevEntry/" + id, {
				'method':'GET',
				'headers': {'Authorization': 'Bearer ' + token}
		  	})
		  const data = await response.json()
		  // update state -- configured earlier.
		  console.log(data)
		  setData(data)
		  setLoading(false)
		}
		fetchData();
	}, [])

	if (loading) {
		return (<>
			<div>Loading!</div>
		</>)
	}
	else{
		// console.log("Made it!")
	}
}
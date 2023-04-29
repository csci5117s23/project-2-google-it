import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useAuth } from "@clerk/nextjs";
import Header from '@/components/header';
import NavBar from '@/components/nav';
import ViewEntry from '@/components/viewEntry';
import AddEditBevForm from '@/components/editBevForm';

const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;


export default function EditPage(){
	const { isLoaded, userId, sessionId, getToken } = useAuth();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter()
	const { id } = router.query
	useEffect(() => {
		if (router.isReady){
			const fetchData = async () => {
				const token = await getToken({template: "BevaryTemplate"})
				const response = await fetch(API_ENDPOINT + "/bevEntry/" + id, {
					'method':'GET',
					'headers': {'Authorization': 'Bearer ' + token}
				})
				// Check if access allowed
				if(response.status === 403){
					router.push("/403");
				}
				const data = await response.json()
				// update state -- configured earlier.
				console.log(data)
				setData(data)
				setLoading(false)
			}
			fetchData();
			
			
		}
		
	}, [router.isReady])
	if (loading) {
		return(<>
			<Header title={"Bevary"}/>
			<div>Loading!</div>
			<NavBar/>
		</>)

	} else {
		return(<>
			<Header title={"Bevary"}/>
			<AddEditBevForm data={data} />
			{/* <div>{data['_id']}</div> */}
			<div class="spacing"></div>
			<NavBar/>
		</>)

	}
}
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useAuth } from "@clerk/nextjs";
import Header from '@/components/header';
import NavBar from '@/components/nav';
import ViewEntry from '@/components/viewEntry';

const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export default function ViewPage(){
	const { isLoaded, userId, sessionId, getToken } = useAuth();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [canEdit, setCanEdit] = useState(false);
	const router = useRouter()
	
	const { id } = router.query
	useEffect(() => {
		if (router.isReady){
			const fetchData = async () => {
				const token = await getToken({template: "BevaryTemplate"})
				console.log("Inside of useEffect!", router.isReady)
				const response = await fetch(API_ENDPOINT + "/bevEntry/" + id, {
					'method':'GET',
					'headers': {'Authorization': 'Bearer ' + token}
				})
			const data = await response.json()
			// update state -- configured earlier.
			console.log(data)
			console.log("USERID COMP" , userId, data['userID'])
			if (userId === data['userID']){
				setCanEdit(true)
		   	}
			setData(data)
			setLoading(false)
			}
			fetchData();
		
			
		}
		
	}, [router.isReady, isLoaded])
	if (loading) {
		return(<>
			<Header title={"Bevary"}/>
			<div>Loading!</div>
			<NavBar/>
		</>)

	} else {
		return(<>
			<Header title={"Bevary"}/>
			<ViewEntry data={data} canEdit={canEdit}/>
			<div class="spacing"></div>
			<NavBar/>
		</>)

	}
}

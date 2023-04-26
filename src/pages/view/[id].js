import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useAuth } from "@clerk/nextjs";
import Header from '@/components/header';
import NavBar from '@/components/nav';
import ViewEntry from '@/components/viewEntry';


export default function ViewPage(){
	const { isLoaded, userId, sessionId, getToken } = useAuth();
	const router = useRouter()
	const { id } = router.query

	return(<>
		<Header title={"Bevary"}/>
		<div>{id}</div>
		<ViewEntry id={id} />
		<NavBar/>
	</>)
}


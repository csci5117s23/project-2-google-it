import React, {useEffect, useState} from 'react'
import { GoogleMap, LoadScript, MarkerF, InfoWindow, Marker } from '@react-google-maps/api';
import { useAuth } from "@clerk/nextjs";
import Header from '@/components/header';
import AddBevForm from '@/components/AddBevForm';
import NavBar from '@/components/nav';
import Loading from '@/components/loading';

const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_BACKEND_API_KEY

export default function AddEntryPage (){
	const [loading, setLoading] = useState(false)
	if(loading){

		return (<>
			<Header title={"Bevary"} />
			<Loading />
		</>	
		)

	}
	else{
		return(
			<>
			<Header title={"Bevary"} />
			<AddBevForm />
			<div class="spacing"></div>
			<NavBar></NavBar>
			</>
		)
	}
}

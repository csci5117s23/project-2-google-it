import React, {useEffect, useState} from 'react'
import { GoogleMap, LoadScript, MarkerF, InfoWindow, Marker } from '@react-google-maps/api';
import { useAuth } from "@clerk/nextjs";
import Header from '@/components/header';
import AddBevForm from '@/components/AddBevForm';

const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_BACKEND_API_KEY

export default function AddEntryPage (){
	const [loading, setLoading] = useState(false)
	if(loading){
		
		return (<>
			<Header title={"Bevary"} />
			<div>Loading...</div>
		</>	
		)
	
	}
	else{
		return(
			<>
			<Header title={"Bevary"} />
			<AddBevForm />
			</>
		)
	}
}
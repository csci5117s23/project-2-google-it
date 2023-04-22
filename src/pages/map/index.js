import React, {useEffect, useState} from 'react'
import { GoogleMap, LoadScript, MarkerF, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import NavBar from '@/components/nav';
import MapInfoWindow from '@/components/mapinfowindow';
import { useAuth } from "@clerk/nextjs";
import Header from '@/components/header';
//Clerk stuff commented out for now

const containerStyle = {
  width: '100%',
  height: '85%'
};
const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_BACKEND_API_KEY

export default function MyComponent() {
	const { isLoaded, userId, sessionId, getToken } = useAuth();
	const [currentLocation, setCurrentLocation] = useState({
		lat: -3.745,
		lng: -38.523
	})
	const [loading, setLoading] = useState(true)
	const [markerData, setMarkerData] = useState(null)
	const [openInfoBox, setOpenInfoBox] = useState(-1);
	const [userToken, setToken] = useState(null);
	useEffect(() => {
		if ("geolocation" in navigator) {
			console.log("Available");
			navigator.geolocation.getCurrentPosition(function(position) {
				setCurrentLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				})

			});
		} 
		else {
			console.log("Not Available");
		}
		
		const fetchData = async () => {
			const token = await getToken({template: "BevaryTemplate"})
			setToken(token)
			console.log(API_ENDPOINT + "/bevEntry")
			const response = await fetch(API_ENDPOINT + "/bevEntry", {
				'method':'GET',
				'headers': {'Authorization': 'Bearer ' + token}
			})
			const data = await response.json()
			setMarkerData(data)
			setLoading(false)  
		}
		fetchData();
	}, []);

	const { mapIsLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
		
	})
	const renderMap = () => {
		// wrapping to a function is useful in case you want to access `window.google`
		// to eg. setup options or create latLng object, it won't be available otherwise
		// feel free to render directly if you don't need that
		// const onLoad = React.useCallback(
		//   function onLoad (mapInstance) {
		// 	// do something with map Instance
		// 	console.log("Loaded")
		//   }
		// )
		return <GoogleMap
		mapContainerStyle={containerStyle}
		center={currentLocation}
		zoom={10}
	  >
		{markerData.map((dict, idx) => {
			return (
				<MapInfoWindow info={dict} setOpen={setOpenInfoBox} idx={idx} curOpen={openInfoBox}></MapInfoWindow>
			)
		})}

		
	  </GoogleMap>
	}

	if(loading){
		
		return (<>
			<Header title={"Bevary"} />
			<div>Loading...</div>
		</>	
		)
	
	} else{
		return (<>
			<Header title={"Bevary"} />
			<div style={{height: "100vh"}}>
			<NavBar />

			{isLoaded ? renderMap() : <div>Google Maps is unavailable at the moment</div>}
			</div>
			</>
		  )
	}
  
}
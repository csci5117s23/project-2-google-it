import React, {useEffect, useState} from 'react'
import { GoogleMap, LoadScript, MarkerF, InfoWindow, Marker } from '@react-google-maps/api';
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
	// const { isLoaded, userId, sessionId, getToken } = useAuth();
	console.log(process.env);
	const [currentLocation, setCurrentLocation] = useState({
		lat: -3.745,
		lng: -38.523
	})
	const [loading, setLoading] = useState(true)
	const [markerData, setMarkerData] = useState(null)
	const [map, setMap] = useState(null)
	const [openInfoBox, setOpenInfoBox] = useState(-1);
	// const [userToken, setToken] = useState(null);
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
		//const token = await getToken({template: "todoListTemplate"})
		//setToken(token)
		const fetchData = async () => {
			console.log(API_ENDPOINT + "/bevEntry")
			const response = await fetch(API_ENDPOINT + "/bevEntry", {
				'method':'GET',
				'headers': {'x-apikey': API_KEY}
			})
			const data = await response.json()
			var locationMap = new Map();
			data.map(entry => {
				const lat = entry["lat"];
				const lng = entry["lng"];
				const key = lat + "," + lng
				if(!locationMap.has(key)){
					locationMap.set(key, [entry]);
				}
				else {
					locationMap.set(key, locationMap.get(key).concat(entry));
				}
			});
			setMap(locationMap);
			setMarkerData(data)
			setLoading(false)  
		}
		fetchData();
	}, []);


	const onMarkerLoad = (marker) => {
		console.log("marker: ", marker);
	};
	const onInfoLoad = infoWindow => {
		console.log('infoWindow: ', infoWindow)
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
			
			<LoadScript
			  googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
			>
			  <GoogleMap
				mapContainerStyle={containerStyle}
				center={currentLocation}
				zoom={10}
				options = {
					{
						gestureHandling: "greedy"
					}
				}
			  >
				{
					[...map].map(entry=> {
						return (
							<MapInfoWindow info={entry[1]} setOpen={setOpenInfoBox} idx={entry[1][0]["_id"]} curOpen={openInfoBox}></MapInfoWindow>
						)
					})
				}

				
			  </GoogleMap>
			</LoadScript>	
			</div>
			</>
		  )
	}
  
}
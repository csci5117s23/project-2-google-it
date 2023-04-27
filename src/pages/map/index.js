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
		lat: 44.9745,
		lng: -93.2322
	})
	const [loading, setLoading] = useState(true)
	const [markerData, setMarkerData] = useState(null)
	const [map, setMap] = useState(null)
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
			{renderMap()}
			</div>
			</>
		  )
	}
  
}
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
	});
	const [loading, setLoading] = useState(true);
	const [useMarkerData, setUserMarkerData] = useState(null);
	const [userMap, setUserMap] = useState(null);
	const [publicMap, setPublicMap] = useState(null);
	const [displayMap, setDisplayMap] = useState(null);
	const [checked, setChecked] = useState(false);
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
			if(userId){
				// Fetch user entries
				const token = await getToken({template: "BevaryTemplate"})
				setToken(token)
				console.log(API_ENDPOINT + "/bevEntry")
				// THIS NEEDS AUTH
				const userResponse = await fetch(API_ENDPOINT + "/bevEntry?userID=" + userId, {
					'method':'GET',
					'headers': {'Authorization': 'Bearer ' + token}
				})
				const userData = await userResponse.json()
				var userMap = new Map();
				userData.map(entry => {
					const lat = entry["lat"];
					const lng = entry["lng"];
					const key = lat + "," + lng;
					entry["personal"] = true;
					if(!userMap.has(key)){
						userMap.set(key, [entry]);
					}
					else {
						userMap.set(key, userMap.get(key).concat(entry));
					}
				});
				setUserMap(userMap);
				setDisplayMap(userMap);
				setUserMarkerData(userData);
				setLoading(false);	

				// Fetch public entries
				// NEEDS AUTH
				// Maybe need custom endpoint to retrieve public entries not owned by the user
				const publicResponse = await fetch(API_ENDPOINT + "/publicEntries", {
					'method':'GET',
					'headers': {'x-apikey': API_KEY}
				})
				const publicData = await publicResponse.json()
				var publicMap = new Map(userMap);
				const filteredData = publicData.filter(item => item["userID"] != userId)

				filteredData.map(entry => {
					const lat = entry["lat"];
					const lng = entry["lng"];
					const key = lat + "," + lng;
					entry["personal"] = false;
					if(!publicMap.has(key)){
						publicMap.set(key, [entry]);
					}
					else {
						publicMap.set(key, publicMap.get(key).concat(entry));
					}
				});
				setPublicMap(publicMap);
				setLoading(false);
				console.log(publicMap);  
			}
		}

		fetchData();
	}, [userId]);

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
				gestureHandling: "greedy",
				styles: [
					{
					  "featureType": "administrative",
					  "elementType": "geometry",
					  "stylers": [
						{
						  "visibility": "off"
						}
					  ]
					},
					{
					  featureType: "poi",
					  stylers: [
						{
						  visibility: "off"
						}
					  ]
					},
					{
					  featureType: "road",
					  elementType: "labels.icon",
					  stylers: [
						{
						  visibility: "off"
						}
					  ]
					},
					{
					  featureType: "transit",
					  stylers: [
						{
						  visibility: "off"
						}
					  ]
					}
				  ]
				// styles:[
				// 	{
				// 	  featureType: "all",
				// 	  elementType: "labels.text",
				// 	  stylers: [
				// 		{
				// 		  visibility: "off"
				// 		}
				// 	  ]
				// 	},
				// 	{
				// 	  featureType: "poi",
				// 	  elementType: "labels.icon",
				// 	  stylers: [
				// 		{
				// 		  visibility: "off"
				// 		}
				// 	  ]
				// 	}
				//   ]
			}
		}
	  >
		{
			[...displayMap].map(entry=> {
				return (
					<MapInfoWindow info={entry[1]} setOpen={setOpenInfoBox} idx={entry[1][0]["_id"]} curOpen={openInfoBox}></MapInfoWindow>
				)
			})
		}
		</GoogleMap>

	}

	function checkBox(){
		if(checked){
			setDisplayMap(userMap);
		}
		else {
			setDisplayMap(publicMap);
		}
		setChecked(!checked);
	}

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
		return (
			<>
				<Header title={"Bevary"} />
				<div style={{height: "100vh"}}>
					<div style={{textAlign:"center"}}>
						<label>
							<input type="checkbox" style={{margin:"3px"}} checked={checked} onClick={checkBox}/>
							See nearby entries
						</label>
					</div>
					<NavBar />
					{isLoaded ? renderMap() : <div>Google Maps is unavailable at the moment</div>}
				</div>
			</>
		)
	}
  
}
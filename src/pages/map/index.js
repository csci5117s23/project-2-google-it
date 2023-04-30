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
				const userResponse = await fetch(API_ENDPOINT + "/bevEntry", {
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
				const publicResponse = await fetch(API_ENDPOINT + "/publicEntries", {
					'method':'GET',
					'headers': {'Authorization': 'Bearer ' + token}
				})
				const publicData = await publicResponse.json()
				var publicMap = new Map(userMap);

				publicData.map(entry => {
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
				disableDefaultUI:true,
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
			}
		}
	  >
		{
			[...displayMap].map(location=> {
				return (
					<MapInfoWindow info={location[1]} setOpen={setOpenInfoBox} idx={location[1][0]["_id"]} curOpen={openInfoBox}></MapInfoWindow>
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
					<div style={{position:"absolute", left:"5%", right:"5%", top:"11%", textAlign:"center", zIndex:7, fontSize:"2vh"}}>
						<label style={{background:"white", padding:"1vh", borderRadius:"5px", border:"1px solid black", color:"black"}}>
							<input type="checkbox" style={{margin:"4px", marginRight:"6px"}} checked={checked} onClick={checkBox}/>
							See nearby Bevary entries
						</label>
					</div>
					<NavBar />
					{renderMap()}
				</div>
			</>
		)
	}
  
}
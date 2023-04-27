import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useAuth } from "@clerk/nextjs";
import ReactStars from "react-rating-stars-component";
import { GoogleMap, LoadScript, LoadScriptNext, MarkerF, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
	width: '400px',
	height: '400px'
  };
  
  const center = {
	lat: -3.745,
	lng: -38.523
  };


export default function ViewEntry({data}){
	console.log(data)
	var date = new Date(data['createdOn'])


	return(<>
	<div class="columns">
		<div class="column" style={{marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
			<h1>{data['bevName']}</h1>
			<h3>{date.toDateString()}</h3>
			{data['imgURL'] ? <img style={{height: '200px'}} src={data['imgURL']}/> : <></>}
			<ReactStars
				count={5}
				isHalf={true}
				size={24}
				activeColor="#ffd700"
				value={data['rating']}
				edit={false}
			/>
			<div>
				This beverage was acquired at {data['locName']} (Map provided below)
			</div>
			{<LoadScriptNext
				googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
				>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={{
						lat: data['lat'],
						lng: data['lng']
					}}
					zoom={10}
				>
					
					<MarkerF
						position={{ lat: data['lat'], lng: data['lng']}}>
    				</MarkerF>
				</GoogleMap>
			</LoadScriptNext>}
			


		</div>
	</div>
		
	</>)
}
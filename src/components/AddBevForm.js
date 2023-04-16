import React, {useEffect, useState} from 'react'
import { GoogleMap, LoadScript, MarkerF, InfoWindow, Marker } from '@react-google-maps/api';
import Resizer from "react-image-file-resizer";
var AWS = require('aws-sdk');

const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_BACKEND_API_KEY
const BUCKET = process.env.NEXT_PUBLIC_BUCKET_NAME;
const IDENTITY_POOL_ID = process.env.NEXT_PUBLIC_IDENTITY_POOL_ID
AWS.config.region = 'us-east-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID,
});


export default function AddBevForm(){
	function handlePhotoUpload(){
		const fileInput = document.getElementsByClassName('file-input')[0]
		const photoUploadDiv = document.getElementById('photoUpload')
		const img = document.getElementById('imgPreview')
		const imgDiv = document.getElementById('photoPreviewDiv')
		imgDiv.setAttribute("class", "")
		img.setAttribute("src", URL.createObjectURL(fileInput.files[0]))
		img.onload = function() {
			URL.revokeObjectURL(img.src) // free memory
		}
		photoUploadDiv.setAttribute("class", "is-invisible")
	}

	function handleNewPhoto(){
		const photoUploadDiv = document.getElementById('photoUpload')
		const imgDiv = document.getElementById('photoPreviewDiv')
		imgDiv.setAttribute("class", "is-hidden")
		photoUploadDiv.setAttribute("class", "file is-large is-boxed")
		const fileInput = document.getElementsByClassName('file-input')[0]
		fileInput.value = ''
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		const img = document.getElementsByClassName('file-input')[0].files[0]
		const bevName = document.getElementById('bevName').value
		const bevLocation = document.getElementById('bevLocation').value
		const bevRating = document.getElementById('bevRating').value
		const bevDescription = document.getElementById('bevDescription').value
		const resizedImage = null;

		var imgLocation = "bevary/user/"
		const uploadData = {
			"bevName": bevName,
			"locName": bevLocation,
			"rating": bevRating,
			"desc": bevDescription
		}
		const backendResponse = await fetch(API_ENDPOINT + "/bevEntry", {
			'method':'POST',
			'headers': {
				'x-apikey': API_KEY,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(uploadData)
		  })

		  
		const backendData = await backendResponse.json()
		const bevID = backendData['_id']
		imgLocation += bevID + '/' + img.name
		console.log(imgLocation, img)

		var upload = new AWS.S3.ManagedUpload({
			params: {
			  Bucket: BUCKET,
			  Key: imgLocation,
			  Body: img
			}
		});		
		var promise = upload.promise();
		promise.then(
			async function(data) {
				const imgURL = "https://csci5117-project1-rankit.s3.us-east-2.amazonaws.com/" + imgLocation
				console.log("IMG URL", imgURL)
				const imdLocData = {
					"imgURL": imgURL
				}
				const updateImageResponse = await fetch(API_ENDPOINT + "/bevEntry/" + bevID, {
					'method':'PATCH',
					'headers': {
						'x-apikey': API_KEY,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(imdLocData)
				  })
				  const updateImageData = await updateImageResponse.json()
				  console.log(updateImageData)
			},
			function(err) {
			  return alert("There was an error uploading your photo: ", err.message);
			}
		);
	}



	return (
	<>
	    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.1359.0.js"></script>
		<form>
		<div class="columns">
			<div class="column">
				<div class="is-hidden" id='photoPreviewDiv'>
					<img class="image is-128x128" id='imgPreview' />
					<button class="button is-large is-danger is-fullwidth" onClick={handleNewPhoto}>Change Photo</button>
				</div>
				<div id='photoUpload' class="file is-large is-boxed">
					<label class="file-label">
						<input class="file-input" type="file" accept='image/*' name="bevPhoto" onChange={handlePhotoUpload} />
						<span class="file-cta">
						<span class="icon is-large">
							<img src='https://cdn-icons-png.flaticon.com/512/3566/3566345.png'/>
						</span>
						<span class="file-label">
							Upload a picture!
						</span>
						</span>
					</label>
				</div>
			</div>
			<div class="column">
				<div class="field">
					<label class="label">Drink Name</label>
					<div class="control">
						<input class="input" type="text" id="bevName" placeholder="Text input" />
					</div>
				</div>
				<div class="field">
					<label class="label">Restaurant/Location</label>
					<div class="control">
						<input id="bevLocation" class="input" type="text" placeholder="Text input" />
					</div>
				</div>
				<div class="field">
					<div class="columns">
						<div class="column is-2">
							<label class="label">Rating</label>
							<div class="control has-icons-right">
							<input id="bevRating" class="input" type="text" placeholder="Range 1-5"/>
							</div>
						</div>
					</div>
				</div>
				<div class="field">
					<label class="label">Anything memorable to add?</label>
					<div class="control">
						<textarea class="textarea" id="bevDescription" placeholder="This beer sucked"></textarea>
					</div>
				</div>
				

			</div>
		</div>
		<div class="columns">
			<div class="container">
				<button onClick={handleSubmit} class="button is-success">Save Entry!</button>
			</div>
		</div>
		</form>
	</>
	)

}
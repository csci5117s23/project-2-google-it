import React, {useEffect, useState} from 'react'
import { GoogleMap, LoadScript, MarkerF, InfoWindow, Marker } from '@react-google-maps/api';
import Resizer from "react-image-file-resizer";

const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_BACKEND_API_KEY

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
		const bevName = document.getElementById('bevName')
		const bevLocation = document.getElementById('bevLocation')
		const bevRating = document.getElementById('bevRating')
		const bevDescription = document.getElementById('bevDescription')
		const resizedImage = null;
		// S/o Upper 5
		Resizer.imageFileResizer(
            img, //file name
            300, //max pixel width
            300, //max pixel height
            "JPEG", //compression format
            100, //quality
            0, //rotation
            (resizedFile) => {
                //Callback function
				resizedFile = URL.createObjectURL(resizedFile);
            },
            "file" //output type
        );

		const uploadData = {
			bevName: bevName,
			rating: bevRating,
			locName: bevLocation,
			desc: bevDescription,
			img: resizedImage
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
		const bevID = data['_id']
		console.log(event)
	}



	return (
	<>
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
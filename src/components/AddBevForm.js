import React, {useEffect, useState} from 'react'
import { GoogleMap, LoadScript, MarkerF, InfoWindow, Marker } from '@react-google-maps/api';

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



	return (
	<>
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
					<input class="input" type="text" placeholder="Text input" />
				</div>
			</div>
			<div class="field">
  				<label class="label">Restaurant/Location</label>
				<div class="control">
					<input class="input" type="text" placeholder="Text input" />
				</div>
			</div>
			</div>
		</div>
	</>
	)

}
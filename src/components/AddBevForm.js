import React, {useEffect, useState} from 'react'
import { GoogleMap, LoadScript, MarkerF, InfoWindow, Marker } from '@react-google-maps/api';

export default function AddBevForm(){
	return (
	<>
		<div class="columns">
			<div class="column">
				<div class="file is-large is-boxed">
					<label class="file-label">
						<input class="file-input" type="file" name="resume" />
						<span class="file-cta">
						<span class="file-icon">
							<i class="fas fa-upload"></i>
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
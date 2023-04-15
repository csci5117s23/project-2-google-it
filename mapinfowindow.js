import {React, useState} from 'react'
import { MarkerF, InfoWindow, Marker } from "@react-google-maps/api";

export default function MapInfoWindow({info}){
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleOpen(){
    setIsOpen(true);
  }

  
  function handleToggleClose(){
    setIsOpen(false);
  }
  console.log(info);
  return (
    <>
    <MarkerF
        // key={this.props.index}
        position={{ lat: info["lat"], lng: info["lng"]}}
        // label={this.props.index.toString()}
        onClick={handleToggleOpen}
        onLoad={() => console.log("making marker")}>
      {
        isOpen &&
      <InfoWindow position={{ lat: info["lat"], lng: info["lng"]}} onCloseClick={handleToggleClose}>
          <span>Something</span>
      </InfoWindow>
      }
    </MarkerF>
    
  </>
)
}
import {React, useState} from 'react'
import { MarkerF, InfoWindow, Marker } from "@react-google-maps/api";

export default function MapInfoWindow({info}){
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleOpen(){
    console.log("hey here")
    setIsOpen(true);
  }

  
  function handleToggleClose(){
    console.log("hey close")
    setIsOpen(false);
  }
  console.log(info);
  return (
    <>
    <Marker
        // key={this.props.index}
        position={{ lat: info["lat"], lng: info["lng"]}}
        // label={this.props.index.toString()}
        onClick={handleToggleOpen}
        onLoad={() => console.log("making marker")}>
    </Marker>
    {
      isOpen &&
    <InfoWindow position={{ lat: info["lat"], lng: info["lng"]}} >
        <span>Something</span>
    </InfoWindow>
    }
  </>
)
}
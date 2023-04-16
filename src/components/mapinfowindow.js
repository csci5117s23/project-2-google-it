import {React, useState} from 'react'
import { MarkerF, InfoWindow, Marker, OverlayView } from "@react-google-maps/api";
import BevaryItem from "./listItem"

export default function MapInfoWindow({info}){
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleOpen(){
    setIsOpen(!isOpen);
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
        <OverlayView mapPaneName={OverlayView.FLOAT_PANE} position={{ lat: info["lat"], lng: info["lng"]}} >
          <BevaryItem info={info}></BevaryItem>
        </OverlayView>
      // <InfoWindow position={{ lat: info["lat"], lng: info["lng"]}} onCloseClick={handleToggleClose} style={{background:"red"}}>
      //     <BevaryItem info={info}></BevaryItem>
      // </InfoWindow>
      }
    </MarkerF>
    
  </>
)
}
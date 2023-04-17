import {React, useState} from 'react'
import { MarkerF, InfoWindow, Marker, OverlayView, InfoBox } from "@react-google-maps/api";
import BevaryItem from "./listItem"

export default function MapInfoWindow({info, setOpen, idx, curOpen}){
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleOpen(){
    setIsOpen(!isOpen);
    setOpen(idx);
  }

  console.log(info);
  return (
    <>
    <MarkerF
        position={{ lat: info["lat"], lng: info["lng"]}}
        onClick={handleToggleOpen}
        onLoad={() => console.log("making marker")}>
      {
        isOpen && curOpen == idx &&
        <OverlayView mapPaneName={OverlayView.FLOAT_PANE} position={{ lat: info["lat"], lng: info["lng"]}} >
          <BevaryItem info={info}></BevaryItem>
        </OverlayView>
      }
    </MarkerF>
    
  </>
)
}
import {React, useState} from 'react'
import { MarkerF, InfoWindow, Marker, OverlayView, InfoBox } from "@react-google-maps/api";
import BevaryItem from "./listItem"

export default function MapInfoWindow({info, setOpen, idx, curOpen}){
  const [isOpen, setIsOpen] = useState(false);
  const lat = info[0]["lat"];
  const long = info[0]["lng"];

  function handleToggleOpen(){
    setOpen(idx);
    setIsOpen(true);
  }

  function handleToggleClose(){
    setOpen(-1);
    setIsOpen(false);
  }

  return (
    <>
    <MarkerF
        position={{ lat: lat, lng: long}}
        onClick={handleToggleOpen}
        onLoad={() => console.log("making marker")}>
      
      {
        isOpen && curOpen == idx &&
        <InfoWindow position={{ lat: lat, lng: long}} onCloseClick={handleToggleClose}>
          <>
            <div style={{maxHeight:"30vh"}}>
              {
                info.map(entry => {
                  return (
                    <div style={{margin:"0.3vh"}}>
                      <BevaryItem info={entry}></BevaryItem>
                    </div>
                )
                })
              }
            </div>
          </>
        </InfoWindow>
      }
    </MarkerF>
    
  </>
)
}
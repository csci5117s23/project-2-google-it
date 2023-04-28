import {React, useState} from 'react'
import { MarkerF, InfoWindow } from "@react-google-maps/api";
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
        icon={{
          // Icon from https://icon-sets.iconify.design/mdi/map-marker/
          path:'M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z',
          strokeColor:(info[info.length - 1]["personal"] && "#39AFEA") || ("#B139EA"),
          fillColor:(info[0]["personal"] && "#88CFF2") || ("#D89AF5"),
          fillOpacity:1,
          scale:1.5,
          anchor: new window.google.maps.Point(12, 24)
        }}>
      
      {
        isOpen && curOpen == idx &&
        <InfoWindow position={{ lat: lat, lng: long}} onCloseClick={handleToggleClose}>
          <>
            <div style={{maxHeight:"30vh"}}>
              <div 
              style={{
                textAlign:"center",
                backgroundColor:"white",
                border:"3px solid #615EFF", 
                borderRadius:"5px",
                fontWeight: "bold",
                padding: "3px 2px",
                boxShadow: "0px 4px 4px #b5b5b5",
                }}
              >
                {info[0]["locName"]}
              </div>
              {
                info.map(entry => {
                  return (
                    <div style={{margin:"0.3vh", marginTop:"1vh"}}>
                      <BevaryItem info={entry} personal={entry["personal"]}></BevaryItem>
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
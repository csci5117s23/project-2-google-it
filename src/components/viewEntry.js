import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";
import ReactStars from "react-rating-stars-component";
import {
  GoogleMap,
  LoadScript,
  LoadScriptNext,
  MarkerF,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import EditBevButton from "./editBevButton";

const containerStyle = {
  width: "375px",
  height: "390px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export default function ViewEntry({ data, canEdit }) {
  var date = new Date(data["createdOn"]);

  return (
    <>
      <div class="columns" style={{ margin: "0px" }}>
        <div
          class="column"
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div class="mb-2">
            {canEdit ? <EditBevButton info={data} /> : <></>}
          </div>
          <div
            style={{
              backgroundColor: "rgb(136, 207, 242)",
              padding: "10px 40px",
              borderRadius: "10px",
            }}
          >
            <h2 className="title is-3" style={{ color: "white" }}>
              {data["bevName"]}
            </h2>
            <h3 className="subtitle is-5" style={{ color: "white" }}>
              {date.toDateString()}
            </h3>
          </div>
          <br></br>
          <div
            style={{
              backgroundColor: "rgb(136, 207, 242)",
              width: "90%",
              height: "5px",
            }}
          ></div>
          <br></br>
          {data["imgURL"] ? (
            <img
              style={{ height: "200px", width: "200px" }}
              src={data["imgURL"]}
            />
          ) : (
            <></>
          )}
          <ReactStars
            count={5}
            isHalf={true}
            size={24}
            activeColor="#ffd700"
            value={data["rating"]}
            edit={false}
          />
          {data["desc"] !== "" ? (
            <div style={{ whiteSpace: "pre-line" }}>
              Description: {data["desc"]}
            </div>
          ) : (
            <></>
          )}
          {/* <div>
				This beverage was acquired at {data['locName']} (Location below)
			</div>
			 */}
          <div
            style={{
              backgroundColor: "rgb(136, 207, 242)",
              padding: "10px 40px",
              borderRadius: "10px",
              color: "white",
              margin: "10px 0px",
            }}
          >
            This beverage was acquired at {data["locName"]} (Location below)
          </div>
          {
            <LoadScriptNext
              googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{
                  lat: data["lat"],
                  lng: data["lng"],
                }}
                zoom={10}
              >
                <MarkerF
                  position={{ lat: data["lat"], lng: data["lng"] }}
                ></MarkerF>
              </GoogleMap>
            </LoadScriptNext>
          }
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
var AWS = require("aws-sdk");
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";
import Toggle from "./Toggle";
import ReactStars from "react-rating-stars-component";
import { LoadScriptNext } from "@react-google-maps/api";
import Loading from "@/components/loading";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const BUCKET = process.env.NEXT_PUBLIC_BUCKET_NAME;
const IDENTITY_POOL_ID = process.env.NEXT_PUBLIC_IDENTITY_POOL_ID;
AWS.config.region = "us-east-2"; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: IDENTITY_POOL_ID,
});

export default function AddEditBevForm({ data }) {
  const [bevPos, setBevPos] = useState({
    lat: data["lat"],
    lng: data["lng"],
  });
  const [toggleLabel, setToggleLabel] = useState(
    data["private"] ? "Private" : "Public"
  );
  const [publicPost, setPublicPost] = useState(data["private"] ? false : true);
  const [ratingValue, setRatingValue] = useState(data["rating"]);
  const [loading, setLoading] = useState(false);
  const [gatheringLocation, setGatheringLocation] = useState(false);
  const [imgSrc, setImgSrc] = useState(data["imgURL"] ? data["imgURL"] : "");
  const router = useRouter();
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  useEffect(() => {
    const bevLoc = document.getElementById("bevLocation");
    if (bevLoc) {
      bevLoc.addEventListener("keyup", function () {
        setGatheringLocation(false);
        var input = document.getElementById("bevLocation");
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place.geometry) {
            setBevPos(place.geometry.location.toJSON());
          } else {
            alert("Not a valid location chosen");
          }
        });
      });
    }
  });

  const toggleState = (state) => {
    setPublicPost(state);
    if (state) {
      setToggleLabel("Public");
    } else {
      setToggleLabel("Private");
    }
  };

  const ratingChanged = (newRating) => {
    setRatingValue(newRating);
  };

  const getCurrentLocation = async () => {
    if ("geolocation" in navigator) {
      setGatheringLocation(true);
      var input = document.getElementById("bevLocation");
      input.value = "Getting Current Location Address";
      var lat = 0;
      var lng = 0;
      navigator.geolocation.getCurrentPosition(async function (position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        setBevPos({
          lat: lat,
          lng: lng,
        });

        const response = await fetch(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            String(lat) +
            "," +
            String(lng) +
            "&key=" +
            GOOGLE_API_KEY,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        input.value = data.results[0].formatted_address;
        setGatheringLocation(false);
      });
    } else {
      alert("Using Current Location is not available");
    }
  };

  function handlePhotoUpload() {
    const fileInput = document.getElementsByClassName("file-input")[0];
    const photoUploadDiv = document.getElementById("photoUpload");
    const img = document.getElementById("imgPreview");
    const imgDiv = document.getElementById("photoPreviewDiv");
    imgDiv.setAttribute("class", "");
    setImgSrc(URL.createObjectURL(fileInput.files[0]));
    img.onload = function () {
      URL.revokeObjectURL(img.src); // free memory
    };
    photoUploadDiv.setAttribute("class", "is-invisible");
  }

  function handleNewPhoto() {
    const photoUploadDiv = document.getElementById("photoUpload");
    const imgDiv = document.getElementById("photoPreviewDiv");
    imgDiv.setAttribute("class", "is-hidden");
    photoUploadDiv.setAttribute("class", "file is-large is-boxed");
    const fileInput = document.getElementsByClassName("file-input")[0];
    fileInput.value = "";
    setImgSrc("");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const img = document.getElementsByClassName("file-input")[0].files[0];
    const bevName = document.getElementById("bevName").value;
    const bevLocation = document.getElementById("bevLocation").value;
    const bevRating = ratingValue;
    const bevDescription = document.getElementById("bevDescription").value;
    var imgLocation = "bevary/" + userId + "/";
    if (bevName === "") {
      alert("A drink name is required to save an entry");
      setLoading(false);
      return;
    }
    if (bevLocation === "" || bevPos === null) {
      alert(
        "A location is required to save an entry. A location must be chosen through the address recommendations or the current location button"
      );
      setLoading(false);
      return;
    }
    const uploadData = {
      bevName: bevName,
      locName: bevLocation,
      rating: bevRating,
      lat: parseFloat(parseFloat(bevPos["lat"]).toFixed(4)),
      lng: parseFloat(parseFloat(bevPos["lng"]).toFixed(4)),
      desc: bevDescription,
      userID: userId,
      private: !publicPost,
      imgURL: imgSrc,
    };

    const token = await getToken({ template: "BevaryTemplate" });
    const backendResponse = await fetch(
      API_ENDPOINT + "/bevEntry/" + data["_id"],
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadData),
      }
    );

    const backendData = await backendResponse.json();
    if (img) {
      const bevID = backendData["_id"];
      // https://stackoverflow.com/questions/3486625/remove-illegal-url-characters-with-javascript
      const epoch = String(Date.now());
      imgLocation +=
        bevID + "/" + epoch + "/" + img.name.replace(/[^a-zA-Z0-9-_]/g, "");

      var upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: BUCKET,
          Key: imgLocation,
          Body: img,
        },
      });
      var promise = upload.promise();
      promise.then(
        async function (data) {
          const imgURL =
            "https://csci5117-project1-rankit.s3.us-east-2.amazonaws.com/" +
            imgLocation;
          const imdLocData = {
            imgURL: imgURL,
          };
          const updateImageResponse = await fetch(
            API_ENDPOINT + "/bevEntry/" + bevID,
            {
              method: "PATCH",
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(imdLocData),
            }
          );
          const updateImageData = await updateImageResponse.json();
          router.push("/list");
        },
        function (err) {
          return alert(
            "There was an error uploading your photo: ",
            err.message
          );
        }
      );
    } else {
      router.push("/list");
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <script src="https://sdk.amazonaws.com/js/aws-sdk-2.1359.0.js"></script>
        <LoadScriptNext
          googleMapsApiKey={GOOGLE_API_KEY}
          libraries={["places"]}
        />
        <div class="section">
          <div class="container">
            <form>
              <div className="fastFadeIn">
                <div class="columns">
                  {data["imgURL"] && data["imgURL"] !== "" ? (
                    <div class="column">
                      <div id="photoPreviewDiv">
                        <img
                          style={{ margin: "0 auto" }}
                          class="image is-128x128"
                          id="imgPreview"
                          src={imgSrc}
                        />
                        <button
                          type="button"
                          class="button is-large is-danger is-fullwidth"
                          onClick={handleNewPhoto}
                        >
                          Change Photo
                        </button>
                      </div>
                      <div
                        id="photoUpload"
                        class="file is-large is-boxed is-hidden"
                      >
                        <label class="file-label">
                          <input
                            class="file-input"
                            type="file"
                            accept="image/*"
                            name="bevPhoto"
                            onChange={handlePhotoUpload}
                          />
                          <div className="slideTopFadeIn">
                            <span class="file-cta">
                              <span class="icon is-large">
                                <img src="https://cdn-icons-png.flaticon.com/512/3566/3566345.png" />
                              </span>
                              <span class="file-label">Upload a picture!</span>
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div class="column">
                      <div class="is-hidden" id="photoPreviewDiv">
                        <img
                          style={{ margin: "0 auto" }}
                          class="image is-128x128"
                          id="imgPreview"
                          src={imgSrc}
                        />
                        <button
                          type="button"
                          class="button is-large is-danger is-fullwidth"
                          onClick={handleNewPhoto}
                        >
                          Change Photo
                        </button>
                      </div>
                      <div id="photoUpload" class="file is-large is-boxed">
                        <label class="file-label">
                          <input
                            class="file-input"
                            type="file"
                            accept="image/*"
                            name="bevPhoto"
                            onChange={handlePhotoUpload}
                          />
                          <span class="file-cta">
                            <span class="icon is-large">
                              <img src="https://cdn-icons-png.flaticon.com/512/3566/3566345.png" />
                            </span>
                            <span class="file-label">Upload a picture!</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                  <div class="column" className="fastFadeIn">
                    <div class="field">
                      <label class="label">
                        Should this post be private or public?
                      </label>
                      <div class="control">
                        <Toggle
                          label={toggleLabel}
                          toggled={publicPost}
                          onClick={toggleState}
                        />
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Drink Name</label>
                      <div class="control">
                        <input
                          class="input"
                          type="text"
                          id="bevName"
                          placeholder="Text input"
                          defaultValue={data["bevName"]}
                          required
                        />
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Restaurant/Location</label>
                      <div class="control">
                        <input
                          id="bevLocation"
                          class="input"
                          type="text"
                          placeholder="Text input"
                          defaultValue={data["locName"]}
                          required
                        />
                        <button
                          type="button"
                          onClick={getCurrentLocation}
                          class="button is-link"
                        >
                          Use Current Location
                        </button>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Rating (1-5)</label>
                      <div class="control">
                        <ReactStars
                          count={5}
                          isHalf={true}
                          onChange={ratingChanged}
                          size={24}
                          value={ratingValue}
                          activeColor="#ffd700"
                        />
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Anything memorable to add?</label>
                      <div class="control">
                        <textarea
                          class="textarea"
                          id="bevDescription"
                          placeholder="This drink sucked"
                          defaultValue={data["desc"]}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="fastFadeIn">
              <div class="column">
                <div class="field">
                  <div class="control">
                    {gatheringLocation ? (
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        class="button is-success"
                        disabled={true}
                      >
                        Attempting to access current location...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        class="button is-success mt-2"
                      >
                        Save Entry!
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

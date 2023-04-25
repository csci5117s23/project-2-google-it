import React, { useEffect, useState } from "react";
var AWS = require("aws-sdk");
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";
import Toggle from "./Toggle";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_BACKEND_API_KEY;
const BUCKET = process.env.NEXT_PUBLIC_BUCKET_NAME;
const IDENTITY_POOL_ID = process.env.NEXT_PUBLIC_IDENTITY_POOL_ID;
AWS.config.region = "us-east-2"; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: IDENTITY_POOL_ID,
});

export default function AddBevForm() {
  const [bevPos, setBevPos] = useState(null);
  const [toggleLabel, setToggleLabel] = useState("Private");
  const [publicPost, setPublicPost] = useState(false)
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  useEffect(() => {
    const bevLoc = document.getElementById("bevLocation");
    if (bevLoc) {
      bevLoc.addEventListener("keyup", function () {
        var input = document.getElementById("bevLocation");
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          setBevPos(place.geometry.location.toJSON());
          console.log(place.geometry.location.toJSON());
        });
      });
    }
  });

  const toggleState = (state) => {
	setPublicPost(state)
	if (state){
		setToggleLabel("Public")
	}
	else{
		setToggleLabel("Private")
	}
  };

  function handlePhotoUpload() {
    const fileInput = document.getElementsByClassName("file-input")[0];
    const photoUploadDiv = document.getElementById("photoUpload");
    const img = document.getElementById("imgPreview");
    const imgDiv = document.getElementById("photoPreviewDiv");
    imgDiv.setAttribute("class", "");
    img.setAttribute("src", URL.createObjectURL(fileInput.files[0]));
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
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const img = document.getElementsByClassName("file-input")[0].files[0];
    const bevName = document.getElementById("bevName").value;
    const bevLocation = document.getElementById("bevLocation").value;
    const bevRating = document.getElementById("bevRating").value;
    const bevDescription = document.getElementById("bevDescription").value;
    var imgLocation = "bevary/" + userId + "/";
    const uploadData = {
      bevName: bevName,
      locName: bevLocation,
      rating: bevRating,
      lat: bevPos["lat"],
      lng: bevPos["lng"],
      desc: bevDescription,
      userID: userId,
	  private: !publicPost
    };

    const token = await getToken({ template: "BevaryTemplate" });
    const backendResponse = await fetch(API_ENDPOINT + "/bevEntry", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });

    const backendData = await backendResponse.json();
    if (img) {
      const bevID = backendData["_id"];
	  // https://stackoverflow.com/questions/3486625/remove-illegal-url-characters-with-javascript
      imgLocation += bevID + "/" + img.name.replace(/[^a-zA-Z0-9-_]/g, '');
      console.log(imgLocation, img);

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
          console.log("IMG URL", imgURL);
          const imdLocData = {
            imgURL: imgURL,
          };
          const updateImageResponse = await fetch(
            API_ENDPOINT + "/bevEntry/" + bevID,
            {
              method: "PATCH",
              headers: {
                "x-apikey": API_KEY,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(imdLocData),
            }
          );
          const updateImageData = await updateImageResponse.json();
          console.log(updateImageData);
          router.push("/map");
        },
        function (err) {
          return alert(
            "There was an error uploading your photo: ",
            err.message
          );
        }
      );
    } else {
      router.push("/map");
    }
  };


  if (loading) {
    return <div>Loading!</div>;
  } else {
    const placeScript =
      "https://maps.googleapis.com/maps/api/js?key=" +
      GOOGLE_API_KEY +
      "&libraries=places";
    console.log(placeScript, GOOGLE_API_KEY);
    return (
      <>
        <script src="https://sdk.amazonaws.com/js/aws-sdk-2.1359.0.js"></script>
        <script src={placeScript} async defer></script>
        <form>
          <div class="columns">
            <div class="column">
              <div class="is-hidden" id="photoPreviewDiv">
                <img class="image is-128x128" id="imgPreview" />
                <button
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
            <div class="column">
				<div class="field">
					<label class="label">Should this post be private or public?</label>
					<div class="control">
					<Toggle label={toggleLabel} toggled={false} onClick={toggleState} />
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
                    required
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Rating (1-5)</label>
                <div class="control">
                  <input id="bevRating" class="input" type="text" required />
                </div>
              </div>
              <div class="field">
                <label class="label">Anything memorable to add?</label>
                <div class="control">
                  <textarea
                    class="textarea"
                    id="bevDescription"
                    placeholder="This beer sucked"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="container">
              <button onClick={handleSubmit} class="button is-success">
                Save Entry!
              </button>
            </div>
          </div>
        </form>
      </>
    );
  }
}

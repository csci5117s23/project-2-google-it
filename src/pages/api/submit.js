// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import React, { useState } from "react";

export default function handler(req, res) {
  const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const img = document.getElementsByClassName("file-input")[0].files[0];
    const bevName = document.getElementById("bevName").value;
    const bevLocation = document.getElementById("bevLocation").value;
    const bevRating = document.getElementById("bevRating").value;
    const bevDescription = document.getElementById("bevDescription").value;
    const resizedImage = null;

    var imgLocation = "bevary/" + userId + "/";
    const uploadData = {
      bevName: bevName,
      locName: bevLocation,
      rating: bevRating,
      lat: bevPos["lat"],
      lng: bevPos["lng"],
      desc: bevDescription,
      userID: userId,
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
    const bevID = backendData["_id"];
    imgLocation += bevID + "/" + encodeURI(img.name);
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
        return alert("There was an error uploading your photo: ", err.message);
      }
    );
    setLoading(false);
  };
  handleSubmit(req);
  if (loading) {
    return <div>Loading!</div>;
  } else {
    res.status(200).json({ name: "John Doe" });
  }
}

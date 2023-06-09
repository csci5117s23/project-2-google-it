import Link from "next/link";
import { React, useState } from "react";
import "bulma/css/bulma.min.css";

export default function ListItem({ info, personal }) {
  const imgS3URL = info["imgURL"];
  let imgURL = imgS3URL;
  return (
    <Link href={"/view/" + info["_id"]}>
      <div
        class="card"
        style={{
          background: (personal && "#88CFF2") || "#D89AF5",
          borderRadius: "1em",
          boxShadow: "0px 3px 4px #b5b5b5",
          border: "2.5px solid #615EFF",
        }}
      >
        <div class="card-content" style={{ padding: "1.7vh" }}>
          <div class="media" style={{ alignItems: "center" }}>
            <div class="media-left">
              {!imgS3URL && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="5vh"
                  height="5vh"
                  viewBox="0 0 72 72"
                >
                  <path fill="#f4aa41" d="M19.895 17H19v50h34V17h-.895" />
                  <path
                    fill="#fcea2b"
                    d="M27.716 49.891a2.168 2.168 0 0 1-.403-2.406c-1.684-3.303-.663-8.017 2.752-11.431s8.128-4.436 11.431-2.752a2.175 2.175 0 0 1 2.883 2.883c1.688 3.306.663 8.016-2.752 11.43s-8.124 4.44-11.431 2.753a2.168 2.168 0 0 1-2.443-.44l-.037-.037"
                  />
                  <path
                    fill="#f4aa41"
                    d="M41.377 47.547c-3.415 3.415-8.125 4.44-11.433 2.753c13.724 0 14.378-13.907 14.378-13.907c1.691 3.304.467 7.739-2.945 11.154Z"
                  />
                  <path
                    fill="#f4aa41"
                    d="M33.424 51.494a16.572 16.572 0 0 1-4.137-1.182l-.99-.408h1.647c5.535 0 9.568-2.27 11.988-6.746a17.793 17.793 0 0 0 1.995-6.783l.07-1.486l.678 1.324c1.766 3.452.582 8.01-3.018 11.614a11.947 11.947 0 0 1-8.233 3.667Zm-1.395-.911a10.627 10.627 0 0 0 9.069-3.316c2.803-2.807 4.059-6.331 3.402-9.224c-.644 3.5-3.133 11.5-12.471 12.54Z"
                  />
                  <path
                    fill="#f4aa41"
                    d="M43.912 33.654a5.77 5.77 0 0 1 .383 2.862l-1.623-1.623l1.24-1.24M27.77 50.36a5.77 5.77 0 0 0 2.888-.082l-1.863-1.341l-1.024 1.423"
                  />
                  <g
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-width="2"
                  >
                    <path
                      stroke-linejoin="round"
                      d="M23 17h26M19 28h34M19 56h34M19.895 17H19v50h34V17h-.895M40 14l2.765-4.978A7.82 7.82 0 0 1 49.602 5H60"
                    />
                    <path
                      stroke-miterlimit="10"
                      d="M27.716 49.891a2.168 2.168 0 0 1-.403-2.406c-1.684-3.303-.663-8.017 2.752-11.431s8.128-4.436 11.431-2.752a2.175 2.175 0 0 1 2.883 2.883c1.688 3.306.663 8.016-2.752 11.43s-8.124 4.44-11.431 2.753a2.168 2.168 0 0 1-2.443-.44l-.037-.037"
                    />
                  </g>
                </svg>
              )}
              {imgS3URL && <img src={imgURL} width={50} height={50} />}
            </div>
            <div class="media-content" style={{ overflow: "hidden" }}>
              <p class="title is-size-6-desktop is-size-7-touch">
                {info["bevName"]}
                <br></br>
                {info["rating"].toFixed(1)} / 5.0<br></br>
              </p>
              <p class="subtitle is-size-6-desktop  is-size-7-touch">
                {new Intl.DateTimeFormat("en-US").format(
                  new Date(info["createdOn"])
                )}
                <br></br>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

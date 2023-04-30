// import { useAuth } from '@clerk/nextjs';
import NavBar from "@/components/nav";
import React, { useEffect, useState } from "react";
import BeverageList from "@/components/beveragelist";
import { useAuth } from "@clerk/nextjs";
import Header from "@/components/header";
import { useRouter } from "next/router";
import Link from "next/link";

// TODO: REMOVE AFTER AUTH
const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_BACKEND_API_KEY;

export default function Location() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const router = useRouter();

  const deleteEntry = async (info) => {
    var id = info["_id"];
    if (
      confirm(
        "Are you sure you want to delete this Bev Entry? This action cannot be undone"
      )
    ) {
      const token = await getToken({ template: "BevaryTemplate" });
      await fetch(API_ENDPOINT + "/bevEntry/" + id, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          var newData = [...data];
          var index = -1;
          for (var i = 0; i < newData.length; i++) {
            if (newData[i]["_id"] === id) {
              index = i;
            }
          }
          newData.splice(index, 1);
          setData(newData);
        });
    }
  };

  useEffect(() => {
    if (router.isReady) {
      setData(JSON.parse(router.query.data));
      setName(router.query.name);
    }
  }, []);

  return (
    <>
      <Header title={"Bevary"} />
      <div
        style={{ display: "flex", alignItems: "center" }}
        className="fastFadeIn"
      >
        <div style={{ flexBasis: "30%", paddingLeft: "0.5em" }}>
          <Link
            href="/list"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="calc(6px + 3vmin)"
                height="calc(5px + 3vmin)"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2H7.825l5.6 5.6L12 20Z"
                />
              </svg>
              <div
                style={{ fontSize: "calc(6px + 2vmin)", paddingRight: "6px" }}
              >
                Journal
              </div>
            </div>
          </Link>
        </div>
        <div
          style={{
            flexGrow: 3,
            textAlign: "center",
            fontSize: "calc(5px + 2vmin)",
          }}
        >
          <b>Your Bevary Entries For: </b>
          {name}
        </div>
        <div style={{ flexBasis: "30%" }}> </div>
      </div>
      <div className="fastBottomSlide" style={{ paddingTop: "4px" }}>
        <BeverageList listItems={data} deleteEntry={deleteEntry}></BeverageList>
      </div>
      <div class="spacing"></div>
      <NavBar></NavBar>
    </>
  );
}

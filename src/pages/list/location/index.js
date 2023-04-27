// import { useAuth } from '@clerk/nextjs';
import NavBar from "@/components/nav";
import React, { useEffect, useState } from "react";
import BeverageList from "@/components/beveragelist";
import { useAuth } from "@clerk/nextjs";
import Header from "@/components/header";
import { useRouter } from 'next/router'

// TODO: REMOVE AFTER AUTH
const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_BACKEND_API_KEY;

export default function List() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [data, setData] = useState([]);
  const router = useRouter()

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
    if(router.isReady){
      console.log(router.query);
      setData(JSON.parse(router.query.data));
    }
  }, []);

  return (
    <>
      <Header title={"Bevary"} />
      <div className="fadeIn">
        <BeverageList listItems={data} deleteEntry={deleteEntry}></BeverageList>
      </div>
      <div class="spacing"></div>
      <NavBar></NavBar>
    </>
  );
}
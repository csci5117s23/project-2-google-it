// import { useAuth } from '@clerk/nextjs';
import NavBar from "@/components/nav";
import React, { useEffect, useState } from "react";
import LocationList from "@/components/locationList";
import React, {useEffect, useState} from 'react'
import { useAuth } from "@clerk/nextjs";
import Header from '@/components/header';
import NavBar from '@/components/nav';

const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
export default function List() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([])

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
    // const fetchData = async () => {
    //   const token = await getToken({ template: "BevaryTemplate" });
    //   const response = await fetch(API_ENDPOINT + "/bevEntry", {
    //     method: "GET",
    //     headers: { Authorization: "Bearer " + token },
    //   });
    //   const data = await response.json();

    //   setData(data);
    // };
    const fetchData = async () => {
      const token = await getToken({ template: "BevaryTemplate" });
      const response = await fetch(API_ENDPOINT + "/bevEntry", {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      });
      const data = await response.json();
      let locationMap = new Map();
      data.map(entry => {
				const lat = entry["lat"];
				const lng = entry["lng"];
				const key = lat + "," + lng
				if(!locationMap.has(key)){
					locationMap.set(key, [entry]);
				}
				else {
					locationMap.set(key, locationMap.get(key).concat(entry));
				}
			});

      const locations = [...locationMap].map(location => location[1]);

      setData(data);
      setLocations(locations);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header title={"Bevary"} />
      <div className="fadeIn">
        <LocationList locations={locations}></LocationList>
      </div>
      <div class="spacing mb-6"></div>
      <NavBar></NavBar>
    </>
  );
}

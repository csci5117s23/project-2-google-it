// import { useAuth } from '@clerk/nextjs';
import NavBar from "@/components/nav";
import React, { useEffect, useState } from "react";
import LocationList from "@/components/locationList";
import { useAuth } from "@clerk/nextjs";
import Header from "@/components/header";
import Loading from "@/components/loading";

const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
export default function List() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken({ template: "BevaryTemplate" });
      const response = await fetch(API_ENDPOINT + "/bevEntry", {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      });
      const data = await response.json();
      let locationMap = new Map();
      data.map((entry) => {
        const lat = entry["lat"];
        const lng = entry["lng"];
        const key = lat + "," + lng;
        if (!locationMap.has(key)) {
          locationMap.set(key, [entry]);
        } else {
          locationMap.set(key, locationMap.get(key).concat(entry));
        }
      });

      const locations = [...locationMap].map((location) => location[1]);

      setLocations(locations);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    console.log("Loading");
    return (
      <>
        <Header title={"Bevary"} />
        <Loading />
        <NavBar />
      </>
    );
  } else {
    let noEntries = true;
    if (locations.length !== 0) {
      noEntries = false;
    }

    return (
      <>
        <Header title={"Bevary"} />
        <div className="fastBottomSlide">
          {noEntries ? (
            <div class="section noBevary">
              <div class="box">
                <h1 class="title centerText fastFadeIn">
                  Tap the <span class="has-text-success">Green +</span> to add
                  an entry into your Bevary!
                </h1>
              </div>
            </div>
          ) : (
            <LocationList locations={locations}></LocationList>
          )}
        </div>
        <div class="spacing mb-6"></div>
        <NavBar></NavBar>
      </>
    );
  }
}

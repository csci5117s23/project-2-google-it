import { React } from "react";
import "bulma/css/bulma.min.css";
import LocationItem from "./locationItem";

export default function LocationList({ locations  }) {
  var columns = [];

  function processLocation(locationEntries){
    const ratings = locationEntries.map(entry => entry["rating"]);
    const avgRating = ratings.reduce((accum, cur) => accum + cur) / ratings.length;
    const locName = locationEntries[0]["locName"];
    return {
      avgRating: avgRating,
      locName: locName,
      entries: locationEntries,
      lastEntry: locationEntries[locationEntries.length - 1]["createdOn"]
    }
  }

  for (let i = 0; i < locations.length; i += 2) {
    if (i == locations.length - 1) {
      const col = (
        <>
          <div
            class="columns is-desktop"
            style={{ marginLeft: "0", marginRight: "0" }}
          >
            <div class="column">
              <LocationItem info={processLocation(locations[i])}></LocationItem>
            </div>
            <div class="column"></div>
          </div>
        </>
      );
      columns.push(col);
    } else {
      const col = (
        <>
          <div
            class="columns is-desktop"
            style={{ marginLeft: "0", marginRight: "0" }}
          >
            <div class="column">
              <LocationItem info={processLocation(locations[i])}></LocationItem>
            </div>
            <div class="column">
              <LocationItem info={processLocation(locations[i + 1])}></LocationItem>
            </div>
          </div>
        </>
      );
      columns.push(col);
    }
  }
  return <>
  {columns.map((column) => column)}
  </>;
}

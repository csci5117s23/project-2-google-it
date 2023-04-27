import { React } from "react";
import ListItem from "./listItem";
import "bulma/css/bulma.min.css";
import DeleteAndEditButtons from "./deleteAndEditButtons";
export default function BeverageList({ listItems, deleteEntry }) {
  var columns = [];
  console.log(listItems)
  for (let i = 0; i < listItems.length; i += 2) {
    if (i == listItems.length - 1) {
      const col = (
        <>
          <div
            class="columns is-desktop"
            style={{ marginLeft: "0", marginRight: "0" }}
          >
            <div class="column">
              <ListItem info={listItems[i]}></ListItem>
              <DeleteAndEditButtons
                info={listItems[i]}
                deleteEntry={deleteEntry}
              />
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
              <ListItem info={listItems[i]}></ListItem>
              <DeleteAndEditButtons
                info={listItems[i]}
                deleteEntry={deleteEntry}
              />
            </div>
            <div class="column">
              <ListItem info={listItems[i + 1]}></ListItem>
              <DeleteAndEditButtons
                info={listItems[i]}
                deleteEntry={deleteEntry}
              />
            </div>
          </div>
        </>
      );
      columns.push(col);
    }
  }

  return <>{columns.map((column) => column)}</>;
}

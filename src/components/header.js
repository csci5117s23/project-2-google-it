import { React } from "react";
import Icon from "./icon";

export default function Header({ title }) {
  return (
    <header>
      <div
        style={{
          textAlign: "center",
          fontSize: "6vh",
          background: "#615EFF",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon />
        {title}
      </div>
    </header>
  );
}

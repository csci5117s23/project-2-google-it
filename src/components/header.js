import { React } from "react";
import Icon from "./icon";
import LogoutButton from "./logoutButton";


export default function Header({ title }) {
  
  return (
    <header>
      <div className="header">
        <div className="sideHeader"></div>
        <div
        style={{
          textAlign: "center",
          fontSize: "6vh",
          background: "#615EFF",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        <Icon />
        {title}
        
        </div>
        <div style={{
          textAlign: "right", 
          width: "25%",
          paddingTop: "15px",
          paddingRight: "10px",
        }}>
          <LogoutButton></LogoutButton>
        </div>
      </div>
      
      
    </header>
  );
}

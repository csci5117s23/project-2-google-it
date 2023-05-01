import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import AddBevForm from "@/components/AddBevForm";
import NavBar from "@/components/nav";
import Loading from "@/components/loading";

export default function AddEntryPage() {
  const [loading, setLoading] = useState(false);
  if (loading) {
    return (
      <>
        <Header title={"Bevary"} />
        <Loading />
      </>
    );
  } else {
    return (
      <>
        <Header title={"Bevary"} />
        <AddBevForm />
        <div class="spacing"></div>
        <NavBar></NavBar>
      </>
    );
  }
}

import React from "react";
import NavBar from "../NavBar";
import { getCurrentSession } from "@/app/session";

const Home = async () => {
  const { user, session } = await getCurrentSession();
  if(session === undefined){
    return
  }
  return (
    <>
      <NavBar status="LoggedIn"/>
    </>
  );
};

export default Home;

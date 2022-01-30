import React from "react";

import Body from "../components/LandingPage/Body";
import Jumbotron from "../components/LandingPage/Jumbotron";

export default function LandingPage() {
  document.title = "DumbSound | Find Your Favorite Music Here";
  return (
    <>
      <div className="pb-5">
        <Jumbotron />
        <Body />
      </div>
    </>
  );
}

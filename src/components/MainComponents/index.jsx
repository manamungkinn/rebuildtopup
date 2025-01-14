import React from "react";
import Card from "../Card";
import HeroSection from "../HeroSection";
import GamePopuler from "../GamePopuler";
import AllGame from "../AllGame";

const MainComponents = () => {
  return (
    <>
      {/* <Card /> */}
      <HeroSection />
      <div className="my-4">
        <GamePopuler />
      </div>
      <div className="my-4">
        <AllGame />
      </div>
    </>
  );
};

export default MainComponents;

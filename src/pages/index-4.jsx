import React from "react";
import Layouts from "@layouts/Layouts";
import dynamic from "next/dynamic";

const Hero4Slider = dynamic( () => import("@components/sliders/Hero4"), { ssr: false } );

const Home4 = () => {
  return (
    <Layouts noFooter>
      <>
        <Hero4Slider />
      </>
    </Layouts>
  );
};
export default Home4;
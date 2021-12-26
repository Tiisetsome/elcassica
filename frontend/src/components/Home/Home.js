import React, {useEffect} from "react";

import Hero from "./Hero/Hero";
import Ladies from "./Ladies/Ladies";
import Men from "./Men/Men";
import MenExplore from "./Men/MenExplore";
import Accessories from "./Accessories/Accessories";
import AccessoriesExplore from "./Accessories/AccessoriesExplore";
import MenSuitExplore from "./Men/MenSuitExplore";
import MenSuitShop from "./Men/MenSuitShop";
import Shoes from "./Shoes/Shoes";
import Sneakers from "./Shoes/Sneakers";
import Kids from "./Kids/Kids";
import Subscribers from "../Form/Subcribers/Subscribers";

function Home() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Hero />
      <Ladies />
      <Men />
      <MenExplore />
      <Accessories />
      <AccessoriesExplore />
      <MenSuitExplore />
      <MenSuitShop />
      <Shoes />
      <Sneakers />
      <Kids />
      <Subscribers />
    </div>
  );
}

export default Home;

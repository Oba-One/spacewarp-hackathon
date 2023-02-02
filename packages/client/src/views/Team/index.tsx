import React from "react";

import { Nav } from "../../components/Nav";

/**
 * Team View
 * 1, Will render unity view here and once the game is loaded, remove loader
 */
const Team: React.FC = () => {
  return (
    <>
      <Nav />
      <section
        id="team"
        className="grid h-screen w-screen justify-between"
      ></section>
    </>
  );
};

export default Team;

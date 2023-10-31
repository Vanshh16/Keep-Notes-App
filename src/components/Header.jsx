import React from "react";
import { IconContext } from "react-icons";
import { AiFillBulb } from "react-icons/ai";

function Header() {
  return (
    <header>
      <h1>
        <IconContext.Provider value={{ size: 25 }}>
          <AiFillBulb />
        </IconContext.Provider>
        Keep Notes
      </h1>
    </header>
  );
}

export default Header;

import React from "react";

import { ConnectWallet } from "./ConnectWallet";

export const Nav: React.FC = () => {
  return (
    <header className="navbar flex items-center justify-between bg-gray-900 px-8">
      <img src="" alt="Dao Smack Logo" className="" />
      <nav className="flex items-center justify-center"></nav>
      <ConnectWallet />
    </header>
  );
};

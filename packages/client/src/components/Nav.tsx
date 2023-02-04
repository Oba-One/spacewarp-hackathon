import React from "react";

import { ConnectWallet } from "./ConnectWallet";

export const Nav: React.FC = () => {
  return (
    <header className="navbar flex items-center justify-between bg-slate-200 px-8">
      <img src="" alt="Dao Smack Logo" className="" />
      <ConnectWallet />
    </header>
  );
};

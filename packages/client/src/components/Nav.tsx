import React from "react";

import { ConnectWallet } from "./ConnectWallet";

export const Nav: React.FC = () => {
  return (
    <header className="header py-02 sticky top-0 flex items-center justify-between bg-white px-8 shadow-md">
      <img src='' alt='Dao Smack Logo' className='' />
      <ConnectWallet />
    </header>
  );
};

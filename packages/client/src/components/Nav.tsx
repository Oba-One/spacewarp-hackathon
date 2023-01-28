import React from "react";

import { ConnectWallet } from "./ConnectWallet";

export const Nav: React.FC = () => {
  return (
    <nav className='fixed inset-0'>
      <ConnectWallet />
    </nav>
  );
};

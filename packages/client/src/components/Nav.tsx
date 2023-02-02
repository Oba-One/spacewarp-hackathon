import React from "react";

import { ConnectWallet } from "./ConnectWallet";

export const Nav: React.FC = () => {
  return (
    <nav className="fixed inset-0 flex justify-end px-4 py-2">
      <ConnectWallet />
    </nav>
  );
};

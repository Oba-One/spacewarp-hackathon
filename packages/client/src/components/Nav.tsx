import React from "react";

import { ConnectWallet } from "./ConnectWallet";

export const Nav: React.FC = () => {
  return (
    <nav className="fixed inset-0">
      <div className='mr-2'>
        Counter: <span id="counter">0</span>
      </div>
      <button
        onClick={() => {
          // @ts-ignore
          window.increment();
        }}
      >
        Increment
      </button>
      <ConnectWallet />
    </nav>
  );
};

import React from "react";
import { Link } from "react-router-dom";

import { avatarGenerator } from "../utils/avatarGenerator";
import { ConnectWallet } from "./ConnectWallet";

export const Nav: React.FC = () => {
  return (
    <header className="navbar fixed z-10 bg-gray-900 px-8 py-4 shadow-sm">
      <div className="navbar-start">
        <img
          src={avatarGenerator.generateRandomAvatar()}
          alt="Dao Smack Logo"
          className="h-12 w-12"
        />
      </div>
      <div className="navbar-center">
        <Link to="/play" className="btn-ghost btn text-2xl normal-case">
          Play
        </Link>
        <Link to="/league" className="btn-ghost btn text-2xl normal-case">
          League
        </Link>
      </div>
      <div className="navbar-end">
        <ConnectWallet />
      </div>
    </header>
  );
};

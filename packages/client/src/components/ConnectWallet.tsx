import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { Button } from "./Button";

export const ConnectWallet = () => {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  if (isConnected)
    return (
      <div>
        Connected to {address}
        <Button onClick={() => disconnect()}>Disconnect</Button>
      </div>
    );

  return <Button onClick={() => connect()}>Connect</Button>;
};

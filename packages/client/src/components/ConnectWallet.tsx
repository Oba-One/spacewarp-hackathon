import React from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export const ConnectWallet = () => {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  if (isConnected)
    return (
      <div>
        Connected to {address}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );

  return <button onClick={() => connect()}>Connect</button>;
};

import { useAccount, useConnect, useDisconnect } from "wagmi";

import { playerAvatar } from "../utils/avatarGenerator";
import { Button } from "./Button";

export const ConnectWallet = () => {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  function handleDisconnection() {
    disconnect();
  }

  if (isConnected)
    return (
      <div className="flex-none gap-2">
        <div className="grid place-items-center">
          <h5>Hyperspace</h5>
          <div className="badge-secondary badge badge-md grid w-24 place-items-center line-clamp-1">
            {address ?? "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"}
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="w-10 rounded-full">
              <img src={playerAvatar} alt="Users Avatar" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-slate-700 p-2 shadow"
          >
            <li onClick={handleDisconnection}>
              <a href="https://daosquad.dev" target="_blank" rel="noreferrer">
                Learn More
              </a>
            </li>
            <li onClick={handleDisconnection}>
              <p>Logout</p>
            </li>
          </ul>
        </div>
      </div>
    );

  return <Button onClick={() => connect()}>Connect</Button>;
};

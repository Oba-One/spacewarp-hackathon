import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";

import { playerAvatar } from "../utils/avatarGenerator";
import { Button } from "./Button";

import { clientChains } from "../modules/clients";
import { useLeague } from "../hooks/useLeague";
import { useLighthouse } from "../hooks/useLighthouse";
import { useLivepeer } from "../hooks/useLivepeer";

export const ConnectWallet = () => {
  const { connectAsync } = useConnect({
    connector: new InjectedConnector({
      chains: clientChains,
    }),
    chainId: 3141,
  });
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { join } = useLeague();
  const { encryptFile, applyAccessConditions, uploadBuffer } = useLighthouse();
  const { getStreamSessions, getStreams } = useLivepeer();

  async function handleConnection() {
    await connectAsync();
    // await join(address ?? `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`);
  }

  async function handleStreaming() {
    try {
      const streams = await getStreams();

      console.log("Streams", streams);
      const stream = streams?.find(
        (stream) => stream.name === `daosmack-match-${7}`
      );

      if (!stream) throw new Error("No stream found");

      const sessions = await getStreamSessions(stream.id);

      if (!sessions) throw new Error("No sessions found");

      const lastRecording = sessions[sessions.length - 1];

      const blob = await fetch(lastRecording.recordingUrl).then((r) =>
        r.blob()
      );

      const buffer = await blob.arrayBuffer();

      // @ts-ignore
      const cid = await uploadBuffer(buffer);

      // setStreamCID(cid);

      // await applyAccessConditions(cid, [
      //   {
      //     chain: "hyperspace",
      //     contractAddress:
      //       address ?? "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      //     id: 3141,
      //     method: "balanceOf",
      //     returnValueTest: {
      //       comparator: ">=",
      //       value: 3,
      //     },
      //     standardContractType: "ERC1155",
      //     parameters: [":userAddress", "collectible"],
      //   },
      // ]);

      // console.log("Uploaded Game Stream", cid);
    } catch (error) {
      console.error("Error uploading game stream", error);
    }
  }

  function handleDisconnection() {
    disconnect();
  }

  if (isConnected)
    return (
      <div className="flex h-12 flex-none gap-2">
        <div className="grid place-items-center">
          <h5>{chain?.name}</h5>
          <div className="badge-secondary badge badge-md grid w-24 place-items-center line-clamp-1">
            {address ?? "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"}
          </div>
        </div>
        <div className="dropdown-end dropdown">
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
        <Button onClick={handleStreaming}>Upload</Button>
      </div>
    );

  return <Button onClick={handleConnection}>Connect</Button>;
};

import { FC } from "react";

import { Asset } from "../../components/Squad/Asset";

interface AssetsProps {
  team: GameElement;
  assets: Asset[];
  proposals: Proposal[];
}

export const Assets: FC<AssetsProps> = ({ assets, proposals }) => {
  const proposalMap = proposals.reduce((acc, proposal) => {
    acc[proposal.id] = proposal;
    return acc;
  }, {} as Record<string, Proposal>);

  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold">Squad Assets</h2>
        <select className=" select max-w-xs">
          <option disabled selected>
            Normal
          </option>
          <option>Normal Apple</option>
          <option>Normal Orange</option>
          <option>Normal Tomato</option>
        </select>
      </div>
      <ul className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
        {assets.map((asset) => (
          <Asset key={asset.id} actionsEnabled {...asset} />
        ))}
      </ul>
    </div>
  );
};

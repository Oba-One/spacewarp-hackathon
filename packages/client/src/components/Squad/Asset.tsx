import { FC } from "react";

import { useAsset } from "../../hooks/useAsset";

interface Metadata {
  name: string;
  description: string;
  power: number;
  energy: number;
}

interface AssetProps extends Asset {
  id: string;
  image: string;
  metadata: Metadata;
  actionsEnabled: boolean;
}

export const Asset: FC<AssetProps> = (asset) => {
  const { proposeUpdate, voteOnProposal } = useAsset(asset);

  return (
    <li className="card card-side flex aspect-[3/4] flex-col items-center justify-between gap-3 bg-slate-800 px-4 py-3 shadow-xl">
      <div className="flex w-full items-center justify-around">
        <h4 className="text-lg font-bold">Rank 4</h4>
        <h4 className="text-xl font-bold">Value: 0.01 FIL</h4>
      </div>

      <div className="flex w-full flex-col items-center justify-around">
        <figure className="w-200 mask mask-squircle">
          <img src="https://picsum.photos/seed/picsum/200/200" alt="Movie" />
        </figure>
        <ul className="avatar-group -space-x-6">
          <figure className="mask mask-hexagon w-16">
            <img src="https://picsum.photos/seed/picsum/200/200" alt="Movie" />
          </figure>
          <figure className="mask mask-hexagon w-16">
            <img src="https://picsum.photos/seed/picsum/200/200" alt="Movie" />
          </figure>
          <figure className="mask mask-hexagon w-16">
            <img src="https://picsum.photos/seed/picsum/200/200" alt="Movie" />
          </figure>
        </ul>
        <p className="text-lg font-light">Asset Name</p>
        <p className="text-center ">
          Short description about asset and metadata
        </p>
      </div>

      <div className=" flex gap-6 py-3">
        <div
          className="max-w-36 tooltip tooltip-top "
          data-tip="A Cherished Decentralized Memory Awaits"
        >
          <button className="btn-secondary btn">Propose Update</button>
        </div>
        <div
          className="max-w-36 tooltip tooltip-top "
          data-tip="What are you waiting for?"
        >
          <button className="wide btn-primary btn">Vot For Proposal</button>
        </div>
      </div>
    </li>
  );
};

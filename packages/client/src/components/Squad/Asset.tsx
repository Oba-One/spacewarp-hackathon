import { FC } from "react";

interface Metadata {
  name: string;
  description: string;
  power: number;
  energy: number;
}

interface AssetProps {
  id: string;
  image: string;
  metadata: Metadata;
  actionsEnabled: boolean;
}

export const Asset: FC<AssetProps> = ({ image, metadata, actionsEnabled }) => {
  return (
    <li className="relative">
      <div className="absolute left-0 top-0 flex justify-between">
        <p>{metadata.power}</p>
        <p>{metadata.energy}</p>
      </div>
      <img src={image} alt={`Asset for ${metadata.name}`} />
      <h3>{metadata.name}</h3>
      <p>{metadata.description}</p>
      {actionsEnabled && (
        <div className="">
          <button>Propose Update</button>
          <button>Vote</button>
        </div>
      )}
    </li>
  );
};

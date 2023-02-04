import { useAsset } from 'hooks/useAsset';
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

export const Asset: FC<AssetProps> = (asset) => {
  // const {} = useAsset(asset);
  
  return (
    <li className="relative">
      <div className="absolute left-0 top-0 flex justify-between">
        <p>{asset.metadata.power}</p>
        <p>{asset.metadata.energy}</p>
      </div>
      <img src={asset.image} alt={`Asset for ${asset.metadata.name}`} />
      <h3>{asset.metadata.name}</h3>
      <p>{asset.metadata.description}</p>
      {asset.actionsEnabled && (
        <div className="">
          <button>Propose Update</button>
          <button>Vote</button>
        </div>
      )}
    </li>
  );
};

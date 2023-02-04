import { FC } from "react";

interface AssetProps {
  name: string;
  avatar?: string;
  collectiblesEarned: number;
}

interface AssetsProps {
  team: GameElement;
  members: AssetProps[];
}

//  <ul className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] w-full gap-3 place-items-center ">
//       {assets.map((asset) => (
//         <AssetCard key={asset.slug} {...asset} />
//       ))}
//     </ul>

export const Assets: FC<AssetsProps> = ({ members }) => {
  members.sort((a, b) => b.collectiblesEarned - a.collectiblesEarned);

  return (
    <ul className="flex flex-col gap-2 p-3 ">
      {members.map((member) => (
        <li className="flex items-center gap-2">
          <img src={member.avatar} alt={`Avatar of teammate ${member.name}`} />
          <h3>{member.name}</h3>
          <p>{member.collectiblesEarned}</p>
        </li>
      ))}
    </ul>
  );
};

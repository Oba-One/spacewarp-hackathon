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

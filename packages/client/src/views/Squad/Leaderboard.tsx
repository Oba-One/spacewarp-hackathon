import { FC } from "react";

interface MemberProps {
  name: string;
  avatar?: string;
  collectiblesEarned: number;
}

interface LeaderBoardProps {
  team: GameElement;
  members: MemberProps[];
}

export const LeaderBoard: FC<LeaderBoardProps> = ({ members }) => {
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

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
    <aside className="flex flex-col gap-6 py-20 px-4">
      <div className="flex justify-between px-4">
        <h2 className="text-4xl font-bold">Squad Rankings</h2>
      </div>
      <ul className="flex flex-col gap-1"></ul>
    </aside>
  );
};

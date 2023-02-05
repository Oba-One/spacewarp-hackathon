import React from "react";

import { Squad } from "../../components/Squad";
import { useSquad } from "../../hooks/useSquad";
import { useLeague } from "../../hooks/useLeague";

import { Assets } from "./Assets";
import { Matches } from "./Matches";
import { LeaderBoard } from "./Leaderboard";

const squads: Record<GameElement, Squad> = {
  water: {
    id: `0x${"water".padEnd(64, "0")}`,
    name: "Water",
    element: "water",
    description: "Water is the coldest",
  },
  earth: {
    id: `0x${"earth".padEnd(64, "0")}`,
    name: "Earth",
    element: "earth",
    description: "Earth is the hardest",
  },
  fire: {
    id: `0x${"fire".padEnd(64, "0")}`,
    name: "Fire",
    element: "fire",
    description: "Fire is the hottest",
  },
  air: {
    id: `0x${"air".padEnd(64, "0")}å`,
    name: "Air",
    element: "air",
    description: "Air is the lightest",
  },
};

const League: React.FC = () => {
  const { squadId, isMember, join } = useLeague();
  const { members, assets, proposals } = useSquad(squadId);

  if (!isMember) {
    return (
      <section className="grid h-full w-full grid-cols-2 grid-rows-2 gap-4">
        {Object.values(squads).map((squad) => (
          <Squad key={squad.id} join={join} {...squad} />
        ))}
      </section>
    );
  }

  return (
    <section
      id="team"
      className="flex h-full w-full flex-col sm:grid sm:grid-cols-[1fr_minmax(360px,_25%)]"
    >
      <div className="flex h-full flex-col gap-16 py-20 px-8 sm:overflow-auto">
        <Matches team="water" members={members.data ?? []} />
        <Assets
          team="water"
          assets={assets.data ?? []}
          proposals={proposals.data ?? []}
        />
      </div>
      <LeaderBoard team="water" members={members.data ?? []} />
    </section>
  );
};

export default League;

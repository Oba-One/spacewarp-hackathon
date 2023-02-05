import React from "react";

import { useLeague } from "../../hooks/useLeague";
import { useSquad } from "../../hooks/useSquad";
import { Nav } from "../../components/Nav";

import { Assets } from "./Assets";
import { Matches } from "./Matches";

const Squad: React.FC = () => {
  const { squadId, isMember, join } = useLeague();
  const { squad, members, assets } = useSquad(squadId);

  if (!isMember) {
    return <div>Not a member</div>;
  }

  return (
    <>
      <Nav />
      {isMember ? (
        <section
          id="team"
          className="flex h-full w-full flex-col sm:grid sm:grid-cols-[1fr_minmax(360px,_25%)]"
        >
          <div className="flex h-full flex-col gap-16 py-20 px-8 sm:overflow-auto">
            <Matches team="water" members={members.data ?? []} />
            <Assets team="water" assets={assets.data ?? []} />
          </div>
        </section>
      ) : (
        <section className="grid h-full w-full grid-cols-2 grid-rows-2">
          <div className="grid place-items-center">
            <div>
              <h1>Water</h1>
              <p></p>
              <ul>
                <li>
                  <img
                    src="https://picsum.photos/seed/picsum/300/400"
                    alt="Water assets you'll gain access to if you join"
                  />
                </li>
                <li>
                  <img
                    src="https://picsum.photos/seed/picsum/300/400"
                    alt="Water assets you'll gain access to if you join"
                  />
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Squad;

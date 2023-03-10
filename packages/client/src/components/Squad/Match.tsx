import { useMatch } from "../../hooks/useMatch";
import { FC } from "react";

interface MatchProps extends Match {
  squadId: `0x${string}`;
  mint: (assetId: number) => Promise<void>;
}

const teamAvatars: Record<GameElement, string[]> = {
  water: [],
  earth: [],
  fire: [],
  air: [],
};

export const Match: FC<MatchProps> = ({ mint, ...match }) => {
  const { mintCollectible, uploadStream } = useMatch(
    match,
    match.squadId,
    mint
  );

  return (
    <li className="card card-side flex aspect-[4/3] flex-col items-center justify-between gap-3 bg-slate-800 px-4 py-3 shadow-xl">
      <div className="flex w-full items-center justify-around">
        <h4 className="text-lg font-bold">{match.squads[0]}</h4>
        <h4 className="text-2xl font-bold">VS</h4>
        <h4 className="text-xl font-bold">{match.squads[1]}</h4>
      </div>
      <p className="text-clamp-1 text-lg font-light">Won by {match.winner}</p>

      <div className="flex w-full items-center justify-around">
        <ul className="avatar-group -space-x-6">
          <figure className="mask mask-hexagon w-16">
            <img src="https://picsum.photos/seed/picsum/200/200" alt="Movie" />
          </figure>
        </ul>
        <figure className="w-200 mask mask-squircle">
          <img src="https://picsum.photos/seed/picsum/200/200" alt="Movie" />
        </figure>
        <ul className="avatar-group -space-x-6">
          <figure className="mask mask-hexagon w-16">
            <img src="https://picsum.photos/seed/picsum/200/200" alt="Movie" />
          </figure>
        </ul>
      </div>

      <div className=" flex gap-6 py-3">
        <div
          className="max-w-36 tooltip tooltip-top "
          data-tip="A Cherished Decentralized Memory Awaits"
        >
          <button className="btn-secondary btn" onClick={uploadStream}>
            Upload Stream
          </button>
        </div>
        <div
          className="max-w-36 tooltip tooltip-top "
          data-tip="What are you waiting for?"
        >
          <button className="wide btn-primary btn" onClick={mintCollectible}>
            Mint Collectible
          </button>
        </div>
      </div>
    </li>
  );
};

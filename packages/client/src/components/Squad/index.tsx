import { Button } from "../../components/Button";
import { FC } from "react";

interface SquadProps extends Squad {
  join: (squad: `0x${string}`) => Promise<void>;
}

const assets: Record<GameElement, string[]> = {
  water: [
    "/assets/water/america-chavez.png",
    "/assets/water/namor.png",
    "/assets/water/the-infinaut.png",
  ],
  earth: [
    "/assets/earth/hulk.png",
    "/assets/earth/nick-fury.png",
    "/assets/earth/ultron.png",
  ],
  fire: [
    "/assets/fire/agatha-harkness.png",
    "/assets/fire/blade.png",
    "/assets/fire/doctor-doom.png",
  ],
  air: [
    "/assets/air/magneto.png",
    "/assets/air/thanos.png",
    "/assets/air/vision.png",
  ],
};
const squadColors: Record<GameElement, string> = {
  water: " border-blue-500 border-4",
  earth: "border-green-500 border-4",
  fire: "border-red-500 border-4",
  air: "border-yellow-500 border-4",
};

export const Squad: FC<SquadProps> = ({ id, element, description, join }) => {
  async function handleJoin() {
    await join(id);
  }

  return (
    <div
      className={`card bg-slate-800 ${squadColors[element]} grid aspect-[1/1] max-h-full  cursor-pointer overflow-hidden rounded-lg shadow-xl`}
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-4xl font-bold capitalize">{element}</h1>
        <p className="text-xl ">{description}</p>
        <ul className="avatar-group -space-x-6">
          {assets[element].map((asset) => (
            <li key={asset} className="">
              <img className="" src={asset} alt={`${element} character`} />
            </li>
          ))}
        </ul>
        {/* <p className="text-xl ">{description}</p */}
        <Button className="" onClick={handleJoin}>
          Join Squad
        </Button>
      </div>
    </div>
  );
};

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
  water: "bg-blue-600 border-blue-700 border-4",
  earth: "bg-green-600 border-green-700 border-4",
  fire: "bg-red-700 border-red-800 border-4",
  air: "bg-yellow-500 border-yellow-600 border-4",
};

export const Squad: FC<SquadProps> = ({ id, element, description, join }) => {
  async function handleJoin() {
    await join(id);
  }

  return (
    <div
      className={`${squadColors[element]} grid aspect-[1/1] min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-lg shadow-xl`}
      onClick={handleJoin}
    >
      <div className="flex flex-col items-center justify-center">
        {/* <h1 className="text-4xl font-bold capitalize">{element}</h1>
        <p className="text-xl ">{description}</p>
        <ul className="avatar-group -space-x-6">
          {assets[element].map((asset) => (
            <li className="aspect-[2/3] ">
              <img className="" src={asset} alt={`${element} character`} />
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

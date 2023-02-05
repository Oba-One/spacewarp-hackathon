import { FC } from "react";

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
  water: "bg-blue-500",
  earth: "bg-green-500",
  fire: "bg-red-500",
  air: "bg-yellow-500",
};

interface SquadProps extends Squad {
  join: (squad: `0x${string}`) => Promise<void>;
}

export const Squad: FC<SquadProps> = ({ id, element, description, join }) => {
  async function handleJoin() {
    await join(id);
  }

  return (
    <div
      className={`${squadColors[element]} grid place-items-center`}
      onClick={handleJoin}
    >
      <div className="">
        <h1 className="text-3xl font-bold">{element}</h1>
        <p>{description}</p>
        <ul className="avatar-group -space-x-6">
          {assets[element].map((asset) => (
            <li className="aspect-[2/3]">
              <img className="" src={asset} alt={`${element} character`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

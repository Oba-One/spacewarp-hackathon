import { FC } from "react";

const assets: Record<GameElement, string[]> = {
  water: ["/"],
};

export const Squad: FC<Squad> = ({ element, description }) => {
  return (
    <div>
      <h1 className="">{element}</h1>
      <p>{description}</p>
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
  );
};

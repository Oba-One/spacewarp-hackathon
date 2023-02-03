import { useCollectible } from 'hooks/useCollectible';
import { FC } from "react";

export const Collectible: FC<Collectible> = (collectible) => {
  const {} = useCollectible(collectible)
  
  return (
    <div>
      <h1>Member</h1>
    </div>
  );
};

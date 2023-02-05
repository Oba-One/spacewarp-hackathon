declare interface Squad {
  id: `0x${string}`; // address of Squad
  name: string; //
  description: string;
  element: GameElement;
}

declare interface Member {
  id: string;
  name: string; // address or ens name
  avatar?: string; // url to avatar stored in ipfs or elsewhere
  collectiblesEarned: number;
  element: GameElement; // element of squad they're aprt of
}

declare interface Match {
  id: string;
  name: string;
  description: string;
  winner: string;
  image: string;
  players: string[];
  squads: string[];
  collectibleRedeemed?: string; // Address of collectible earned tied to squad
  startedAt: number;
  finishedAt: number;
}

declare interface Proposal {
  id: string;
  assetId: string;
  proposer: string;
  description: string;
  image: string;
  forVotes: number;
  againstVotes: number;
  // abstainVotes: number;
  cancelled: boolean;
  executed: boolean;
}

declare interface Asset {
  id: string;
  squadId: `0x${string}`;
  name: string;
  description: string;
  image: string;
  cid: string;
  characters: string[];
  locations: string[];
  proposals: Proposal[];
}

declare interface Squad {
  id: string;
  name: string;
  description: string;
  owner: string;
  image: string;
  stream: string;
  assetsEarned: string[];
  joinSquaded?: boolean;
  element: GameElement;
}

declare interface Member {
  id: string;
  name: string;
  description: string;
  owner: string;
  image: string;
  stream: string;
  assetsEarned: string[];
  element: GameElement;
}

declare interface Proposal {
  id: string;
  proposer: string;
  description: string;
  asset: string;
  image: string;
  votesFor: number;
  votesAgainst: number;
}

declare interface Asset {
  id: string;
  name: string;
  description: string;
  winner: string;
  image: string;
  stream: string;
  characters: string[];
  locations: string[];
  proposals: string[];
}

declare interface Squad {
  id: string;
  name: string;
  description: string;
  owner: string;
  image: string;
  stream: string;
  assetsEarned: string[];
  joinSquaded?: boolean;
}

declare interface Member {
  id: string;
  name: string;
  description: string;
  owner: string;
  image: string;
  stream: string;
  assetsEarned: string[];
  joinSquaded?: boolean;
}

declare interface Proposal {
  id: string;
  name: string;
  description: string;
  owner: string;
  image: string;
  stream: string;
  assetsEarned: string[];
  joinSquaded?: boolean;
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

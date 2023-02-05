declare interface Collectible {
  id: string;
  name: string;
  description: string;
  owner: string;
  image: string;
  stream: string;
  assetsEarned: string[];
  redeemed?: boolean;
}

declare interface GameResult {
  winner: string;
  loser: string;
  locationsWon: number;
  teams: string[];
  screenshot?: string;
}

declare type GameElement = "water" | "earth" | "fire" | "air";

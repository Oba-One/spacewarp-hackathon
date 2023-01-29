# SpaceWarp Hackathon 2023 -- MudSnap

This is the official SpaceWarp Hackathon 2023 submission for our project MudSnap.

## Project Description

MudSnap3 is a full on chain game that is built using the Mud ECS(Enity Component System) framework. It is based on Marvel Snap a simple and fun game with a limited amount of turns and the simple objective to win 2 or more locations with characters with different power & effects in your deck. It translates well to fit on chain game models since there's at most 12 transactions and the game can be wagered based covering the cost of game actions.

## Features

Focused on creating a fun and interactive experience MudSnap has the following features:

- Users can create a games with a wager and generate a deck of random characters
- Game can be joined by using the game id and accepting the wager, and creating a wager pool.
- 6 turn game where each turn (transaction paid from wager pool) based on a players energy they can play cards from their deck on 1 of 3 locations.
- Locations and charcaters have effects that augment the game play and randomness is introduced in the drawing of cards and revealing of locations.
- In game audio and text chat, notifications, and livestreaming for friends and followers.
- (If time permits) Users earn collectibles (characters, locations) for playing games and can use them to create custom decks.

## How it Works

1. Users either create a game or join a game by entering the game id and setting/accepting the wager.
2. Upon joining the game the user has a randomly generated deck of 12 characters woth diffeent energy and power levels.
3. The game is played in 6 turns, each turn the user can play cards if they have enough energy, with the goal of winning 2 or more locations.After each turn the user gains energy.
4. The game is over after the 6th turn and the winner determined by the number of locations they have won based on the power/effects of the cards placed.
5. (If time permits) Users can earn collectibles (characters, locations) for playing games and can use them to create custom decks.
6. (If time permits) Users can join one of 4 teams (Water, Earth, Fire, Air) and earn team collectibles for playing games.

## What's next?

**Gameplay**

- Add more characters and locations and make a more interactive UI.
- Introduce another matrix to the game with a Risk like element.

**TeamDAO**

- Users can join one of 4 teams (Water, Earth, Fire, Air) and earn team tokens for playing games.
- Users rank is based on game results and mostly contribution to the DAOs deck.
- Team DAO can be used to vote on team specific features and upgrades such as new characters, locations, and asset updates.
- Teams can augment the game logic adding new components and systems controlled by the DAO and with access control for members
- Users can have a part of their deck be made up from the team DAO deck.
- Dashboard for viewing team stats compared to other teams. Along with how teammates rank against each other.

**Marketplace**

- Team/Users can trade characters and locations with each other.
- Hook into emerging game centric NFT marketplaces to enable users to seamlessly trade characters and locations.

## Getting Started

The app is a monorepo using yarn workspaces. The `packages` directory holds the web client, smart contracts, and unity game. The web client is a Typescript React app using Vite and TailwindCSS. The contracts are written in Solidity, with Foundry for compiling, testing, and deployment. Lastly if doing Unity development you will need to install _Unity 2020.3.2f1_ then open in the editor to download the required packages.

Install yarn

```bash
npm i -g yarn
```

Install dependencies, this also generates the smart contract typescript bindings.

```bash
yarn
```

Copy & fill environments

```bash
cp packages/client/.env.local.example packages/client/.env.local
cp packages/contracts/.env.example packages/contracts/.env
```

_Note_: If doing Unity development you can run:

```bash
yarn build:unity
```

to build the unity game and copy the build to the web client.

## Development

```bash
# Starts anvil chain node, web client, and deploy contracts to local chain.
yarn dev
```

## Contact Information :

You can contact the team on the address : contact@mudsnap.com

## Video Link :

[MudSnap3 Video](https://www.loom.com)

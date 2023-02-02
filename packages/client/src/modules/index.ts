import { setupMUDNetwork } from "@latticexyz/std-client";
import { createWorld, defineComponent, Type } from "@latticexyz/recs";
import { SystemTypes } from "contracts/types/SystemTypes";
import { SystemAbis } from "contracts/types/SystemAbis.mjs";
import {
  defineNumberComponent,
  defineStringComponent,
} from "@latticexyz/std-client";
import { config } from "./config";

// The world contains references to all entities, all components and disposers.
const world = createWorld();

// Components contain the application state.
// If a contractId is provided, MUD syncs the state with the corresponding
// component contract (in this case `CounterComponent.sol`)
const components = {
  Asset: defineStringComponent(world, {
    metadata: {
      contractId: "component.Asset",
    },
  }),
  Identity: defineComponent(
    world,
    {
      name: Type.String,
      description: Type.String,
    },
    { id: "component.Identity", metadata: { contractId: "component.Identity" } }
  ),
  OwnedBy: defineNumberComponent(world, {
    metadata: {
      contractId: "component.OwnedBy",
    },
  }),
  Position: defineComponent(
    world,
    {
      deck: Type.Number,
      location1: Type.Number,
      location2: Type.Number,
      location3: Type.Number,
    },
    { id: "component.Position", metadata: { contractId: "component.Position" } }
  ),
};

// Components expose a stream that triggers when the component is updated.
components.Asset.update$.subscribe(({ value }) => {
  document.getElementById("asset")!.innerHTML = String(value?.[0]?.value);
});
components.Identity.update$.subscribe(({ value }) => {
  document.getElementById("identity")!.innerHTML = String(value?.[0]?.name);
});
components.OwnedBy.update$.subscribe(({ value }) => {
  document.getElementById("ownedBy")!.innerHTML = String(value?.[0]?.value);
});
components.Position.update$.subscribe(({ value }) => {
  document.getElementById("position")!.innerHTML = String(value?.[0]?.deck);
});

// This is where the magic happens
setupMUDNetwork<typeof components, SystemTypes>(
  config,
  world,
  components,
  SystemAbis
).then(({ startSync, systems }) => {
  // After setting up the network, we can tell MUD to start the synchronization process.
  startSync();
  console.log("components", components.Asset.values);
  console.log("systems: ", systems["mudSnap.system.Init"]);
  // Just for demonstration purposes: we create a global function that can be
  // called to invoke the Increment system contract. (See IncrementSystem.sol.)
  (window as any).init = () => systems["mudSnap.system.Init"].execute("init");
});

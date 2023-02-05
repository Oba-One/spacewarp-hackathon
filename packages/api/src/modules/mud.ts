import {
  createWorld,
  defineComponent,
  createEntity,
  withValue,
  defineSystem,
  Has,
  getComponentValue,
  setComponent,
} from "@latticexyz/recs";

// Create a new World
const World = createWorld();

// Define a couple components
const Position = defineComponent(world, { x: Type.Number, y: Type.Number });
const Movable = defineComponent(world, { speed: Type.Number });

// Create a new entity
const entity1 = createEntity(world, [
  withValue(Position, { x: 0, y: 0 }),
  withValue(Movable, { speed: 10 }),
]);

// Define a system that reacts to updates of movable entities with a position
defineSystem(world, [Has(Position), Has(Movable)], (update) => {
  console.log("Entity", update.entity, "moved to", update.value);
  // ... do stuff, like rendering the entity on the screen, etc
});

// Move the entity around
setInterval(() => {
  const currentPosition = getComponentValue(Position, entity1);
  const newPosition = { x: position.x + 1, y: position.y + 1 };
  setComponent(Position, entity1, newPosition);
}, 1000);

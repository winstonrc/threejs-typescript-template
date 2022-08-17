import { World } from './World/World';

async function main() {
  const container = document.querySelector(
    '#scene-container'
  ) as HTMLCanvasElement;

  const world = new World(container);
  await world.init();
  world.start();

  // addEventListener('click', () => {
  //   if (world.isRunning() === false) {
  //     world.start();
  //   } else {
  //     world.stop();
  //   }
  // });
}

main().catch((err) => {
  console.log(err);
});

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { setupModel } from './setupModel';

async function loadModels() {
  const loader = new GLTFLoader();

  const [parrotData] = await Promise.all([
    loader.loadAsync('public/assets/models/Parrot.glb'),
  ]);

  const parrot = setupModel(parrotData);
  parrot.position.set(0, 1, 0);

  return {
    parrot,
  };
}

export { loadModels };

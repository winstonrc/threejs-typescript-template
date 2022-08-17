import { AnimationMixer, Object3D } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

function setupModel(data: GLTF): Object3D {
  const model = data.scene.children[0];
  const clip = data.animations[0];

  const mixer = new AnimationMixer(model);
  const action = mixer.clipAction(clip);
  action.play();

  // @ts-ignore
  model.tick = (delta: number) => mixer.update(delta);

  return model;
}

export { setupModel };

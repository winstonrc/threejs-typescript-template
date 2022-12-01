import {
  AmbientLight,
  DirectionalLight,
} from 'three';

interface lightTypes {
  directionalLight: DirectionalLight;
  ambientLight: AmbientLight;
}

function createLights(): lightTypes {
  const ambientLight = new AmbientLight(0xffffff, 0.6);
  const directionalLight = new DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(200, 500, 300);

  return { ambientLight, directionalLight };
}

export { createLights };

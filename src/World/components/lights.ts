import {
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
  MathUtils,
} from 'three';

interface lightTypes {
  mainLight: DirectionalLight;
  ambientLight: AmbientLight;
  hemisphereLight: HemisphereLight;
}

function createLights(): lightTypes {
  const mainLight = new DirectionalLight('white', 8);
  mainLight.position.set(10, 10, 10);

  const ambientLight = new AmbientLight('white', 2);

  // uses a bright sky color and a dark ground color
  const hemisphereLight = new HemisphereLight('white', 'darkslategray', 4);

  const radiansPerSecond = MathUtils.degToRad(90);

  // @ts-ignore
  mainLight.tick = (delta: number) => {
    // light.position.z += radiansPerSecond * delta;
    mainLight.position.x += radiansPerSecond * delta;
    // light.position.y += radiansPerSecond * delta;
  };

  return { mainLight, ambientLight, hemisphereLight };
}

export { createLights };

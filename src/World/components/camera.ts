import { MathUtils, PerspectiveCamera } from 'three';

function createCamera(): PerspectiveCamera {
  const camera = new PerspectiveCamera(
    35, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    100 // far clipping plane
  );

  camera.position.set(0, 4, 10);

  const radiansPerSecond = MathUtils.degToRad(60);

  // @ts-ignore
  camera.tick = (delta: number) => {
    camera.position.z += radiansPerSecond * delta;
    // camera.position.x += radiansPerSecond * delta;
    // camera.position.y += radiansPerSecond * delta;
  };

  return camera;
}

export { createCamera };

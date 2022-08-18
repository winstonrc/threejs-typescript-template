import { OrthographicCamera, PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface controlsTypes {
  camera: PerspectiveCamera | OrthographicCamera;
  canvas: HTMLCanvasElement;
}

function createControls({ camera, canvas }: controlsTypes): OrbitControls {
  const controls = new OrbitControls(camera, canvas);
  controls.minDistance = 1;
  controls.maxDistance = 95;
  controls.enablePan = true;
  // damping & auto rotation require the controls to be updated each frame
  controls.enableDamping = true;

  // @ts-ignore
  controls.tick = () => controls.update();

  return controls;
}

export { createControls };

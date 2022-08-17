import {
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  WebGL1Renderer,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { loadBirds } from './components/birds/birds';
import { createCamera } from './components/camera';
import { createLights } from './components/lights';
import { createScene } from './components/scene';
import { createControls } from './systems/controls';
import { Loop } from './systems/Loop';
import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';

/**
 * If two instances of the World class are created, the second instance will
 * overwrite the module scoped variables below from the first instance.
 * Since we only plan on creating one World class at a time,
 * we will accept this limitation.
 */
let camera: PerspectiveCamera | OrthographicCamera;
let scene: Scene;
let renderer: WebGLRenderer | WebGL1Renderer;
let controls: OrbitControls;
let loop: Loop;
let isRunning: boolean;
class World {
  constructor(container: HTMLCanvasElement) {
    camera = createCamera();

    /**
     * Set the scene's background color to the same as the container's
     * background color in index.css to prevent flashing on load
     * (src/styles/index.css #scene-container)
     */
    scene = createScene({ backgroundColor: 'skyblue' });
    renderer = createRenderer();
    controls = createControls({ camera: camera, canvas: renderer.domElement });
    loop = new Loop({ camera, scene, renderer });
    container.append(renderer.domElement);

    const { mainLight, hemisphereLight } = createLights();

    loop.updatables.push(controls);
    scene.add(mainLight, hemisphereLight);

    new Resizer({ container, camera, renderer });
  }

  async init() {
    const { parrot, flamingo, stork } = await loadBirds();
    controls.target.copy(parrot.position);

    loop.updatables.push(parrot, flamingo, stork);
    scene.add(parrot, flamingo, stork);
  }

  // for apps that update occasionally
  render() {
    renderer.render(scene, camera);
  }

  // for apps with constant animation
  start() {
    loop.start();
    isRunning = true;
  }

  stop() {
    loop.stop();
    isRunning = false;
  }

  isRunning() {
    return isRunning;
  }
}

export { World };

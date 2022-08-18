import {
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  WebGL1Renderer,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createCamera } from './components/camera';
import { createAxesHelper, createGridHelper } from './components/helpers';
import { createLights } from './components/lights';
import { loadModels } from './components/models/loadModels';
import { createScene } from './components/scene';
import { createControls } from './systems/controls';
import { Loop } from './systems/Loop';
import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';

/**
 * If two instances of the World class are created, the second instance will
 * overwrite the module scoped variables below from the first instance.
 * Accordingly, only one World class should be used at a time.
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
    scene = createScene({ backgroundColor: 'transparent' });
    renderer = createRenderer();
    controls = createControls({ camera: camera, canvas: renderer.domElement });
    loop = new Loop({ camera, scene, renderer });
    container.append(renderer.domElement);

    const { mainLight, hemisphereLight } = createLights();

    loop.updatables.push(controls);
    scene.add(mainLight, hemisphereLight);

    new Resizer({ container, camera, renderer });

    const grid = createGridHelper();
    const axes = createAxesHelper();

    scene.add(grid, axes);
  }

  async init() {
    const { parrot } = await loadModels();
    controls.target.copy(parrot.position);

    loop.updatables.push(parrot);
    scene.add(parrot);
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

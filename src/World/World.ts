import {
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  WebGL1Renderer,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createCamera } from './components/camera';
import { createAxesHelper, createGridHelper } from './components/helpers';
import { createLights } from './components/lights';
import { createCar } from './components/objects/car';
import { createScene } from './components/scene';
import { createControls } from './systems/controls';
import { Loop } from './systems/Loop';
import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';
import { createMap } from './components/objects/map'

/**
 * If two instances of the World class are created, the second instance will
 * overwrite the module scoped variables below from the first instance.
 * Accordingly, only one World class should be used at a time.
 */
let camera: OrthographicCamera;
let scene: Scene;
let renderer: WebGLRenderer | WebGL1Renderer;
let controls: OrbitControls;
let loop: Loop;
let isRunning: boolean;
class World {
  constructor(container: HTMLCanvasElement) {
    camera = createCamera();

    scene = createScene();
    renderer = createRenderer();
    loop = new Loop({ camera, scene, renderer });
    container.append(renderer.domElement);

    const { directionalLight, ambientLight } = createLights();

    scene.add(directionalLight, ambientLight);


    const grid = createGridHelper();
    const axes = createAxesHelper();

    scene.add(grid, axes);
  }

  async init() {
    const car = createCar();
    const map = createMap();
    scene.add(car);
    scene.add(map);
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

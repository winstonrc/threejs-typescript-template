import { Scene, Object3D } from 'three';

function createScene(): Scene {
  const scene = new Scene();

  /**
   * Set the scene's background color to the same as the container's
   * background in index.css to prevent flashing on load
   * (src/styles/index.css #scene-container)
   */
  return scene;
}

export { createScene };

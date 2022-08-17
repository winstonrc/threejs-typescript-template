import { Color, Scene } from 'three';

function createScene({ backgroundColor }: { backgroundColor: string }): Scene {
  const scene = new Scene();

  /**
   * Set the scene's background color to the same as the container's
   * background in index.css to prevent flashing on load
   * (src/styles/index.css #scene-container)
   */
  scene.background = new Color(backgroundColor);
  return scene;
}

export { createScene };

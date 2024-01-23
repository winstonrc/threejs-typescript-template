import {
  BoxGeometry,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Texture,
} from 'three';

interface Cube {
  cubeType: 'basic' | 'Basic' | 'standard' | 'Standard';
  texture?: Texture;
  color?: string;
}

function createMaterial({ cubeType, texture, color }: Cube) {
  let material: MeshBasicMaterial | MeshStandardMaterial;

  if (cubeType.toLowerCase() === 'standard') {
    if (texture && color) {
      material = new MeshStandardMaterial({ map: texture, color: color });
    } else if (texture) {
      material = new MeshStandardMaterial({ map: texture });
    } else if (color) {
      material = new MeshStandardMaterial({ color: color });
    } else {
      material = new MeshStandardMaterial();
    }
  } else if (cubeType.toLowerCase() === 'basic') {
    if (texture && color) {
      material = new MeshBasicMaterial({ map: texture, color: color });
    } else if (texture) {
      material = new MeshBasicMaterial({ map: texture });
    } else if (color) {
      material = new MeshBasicMaterial({ color: color });
    } else {
      material = new MeshBasicMaterial();
    }
  } else {
    throw new Error(`Bad type! Use 'standard' or 'basic'.`);
  }

  return material;
}

function createCube({ cubeType, texture, color }: Cube): Mesh {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = createMaterial({ cubeType, texture, color });
  const cube = new Mesh(geometry, material);

  const radiansPerSecond = MathUtils.degToRad(30);

  // @ts-ignore
  cube.tick = (delta: number) => {
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };

  return cube;
}

export { createCube };

import {
  ConeBufferGeometry,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Texture,
} from 'three';

interface Cone {
  coneType: 'basic' | 'Basic' | 'standard' | 'Standard';
  texture?: Texture;
  color?: string;
}

function createMaterial({ coneType, texture, color }: Cone) {
  let material: MeshBasicMaterial | MeshStandardMaterial;

  if (coneType.toLowerCase() === 'standard') {
    if (texture && color) {
      material = new MeshStandardMaterial({ map: texture, color: color });
    } else if (texture) {
      material = new MeshStandardMaterial({ map: texture });
    } else if (color) {
      material = new MeshStandardMaterial({ color: color });
    } else {
      material = new MeshStandardMaterial();
    }
  } else if (coneType.toLowerCase() === 'basic') {
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

function createCone({ coneType, texture, color }: Cone): Mesh {
  const geometry = new ConeBufferGeometry(1, 2, 3);
  const material = createMaterial({ coneType, texture, color });
  const Cone = new Mesh(geometry, material);

  const radiansPerSecond = MathUtils.degToRad(30);

  // @ts-ignore
  Cone.tick = (delta: number) => {
    Cone.rotation.z += radiansPerSecond * delta;
    Cone.rotation.x += radiansPerSecond * delta;
    Cone.rotation.y += radiansPerSecond * delta;
  };

  return Cone;
}

export { createCone };

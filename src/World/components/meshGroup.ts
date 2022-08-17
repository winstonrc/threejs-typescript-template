import { Group, MathUtils } from 'three';
import { createSphere } from './objects/sphere';

function createMeshGroup(): Group {
  const group = new Group();

  const protoSphere = createSphere();

  group.add(protoSphere);

  for (let i = 0; i < 1; i += 0.001) {
    const sphere = protoSphere.clone();

    // Places the spheres in a circle
    sphere.position.x = Math.cos(2 * Math.PI * i);
    sphere.position.y = Math.sin(2 * Math.PI * i);
    sphere.position.z = i * 5;

    sphere.scale.multiplyScalar(0.01 + i);

    group.add(sphere);
  }

  group.scale.multiplyScalar(2);

  const radiansPerSecond = MathUtils.degToRad(30);

  // @ts-ignore
  group.tick = (delta) => {
    group.rotation.z += delta * radiansPerSecond;
  };

  return group;
}

export { createMeshGroup };

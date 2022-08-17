import { Mesh, MeshStandardMaterial, SphereBufferGeometry } from 'three';

function createSphere(): Mesh {
  const geometry = new SphereBufferGeometry(0.25, 16, 16);

  const material = new MeshStandardMaterial({ color: 'indigo' });

  return new Mesh(geometry, material);
}

export { createSphere };

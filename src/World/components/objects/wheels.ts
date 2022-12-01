import {
    MeshLambertMaterial,
    Mesh,
    CylinderGeometry
} from 'three';


function createWheels() {

    const geometry = new CylinderGeometry(10, 10, 33, 16, 1);
    geometry.rotateZ(-Math.PI * 0.5);
    geometry.rotateY(-Math.PI * 0.5);
    const material = new MeshLambertMaterial({ color: 0x333333 });
    const wheel = new Mesh(geometry, material);
    return wheel;
}
export { createWheels };

import { createWheels } from './wheels'
import { Group, Mesh, BoxGeometry, MeshLambertMaterial, CanvasTexture, Vector2 } from 'three'

function getCarFrontTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 64, 32);

    context.fillStyle = "#666666";
    context.fillRect(8, 8, 48, 24);

    return new CanvasTexture(canvas);
}

function getCarSideTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 128, 32);

    context.fillStyle = "#666666";
    context.fillRect(10, 8, 38, 24);
    context.fillRect(58, 8, 60, 24);

    return new CanvasTexture(canvas);
}
function createCar() {
    const car = new Group();

    const backWheel = createWheels();
    backWheel.position.x = -18;
    car.add(backWheel);

    const frontWheel = createWheels();
    frontWheel.position.x = 18;
    car.add(frontWheel);

    const main = new Mesh(
        new BoxGeometry(60, 15, 30),
        new MeshLambertMaterial({ color: 0x78b14b })
    );
    main.position.y = 12;
    car.add(main);
    const carFrontTexture = getCarFrontTexture();

    const carBackTexture = getCarFrontTexture();

    const carRightSideTexture = getCarSideTexture();

    const carLeftSideTexture = getCarSideTexture();
    carLeftSideTexture.center = new Vector2(0.5, 0.5);
    carLeftSideTexture.rotation = Math.PI;
    carLeftSideTexture.flipY = false;
    const cabin = new Mesh(
        new BoxGeometry(33, 24, 12),
        [
            new MeshLambertMaterial({ map: carFrontTexture }),
            new MeshLambertMaterial({ map: carBackTexture }),
            new MeshLambertMaterial({ color: 0xffffff }), // top
            new MeshLambertMaterial({ color: 0xffffff }), // bottom
            new MeshLambertMaterial({ map: carRightSideTexture }),
            new MeshLambertMaterial({ map: carLeftSideTexture }),
        ]
    );
    cabin.position.x = -6;
    cabin.position.y = 25.5;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    car.add(cabin);

    return car;
}

export { createCar }
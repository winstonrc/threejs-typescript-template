import { CanvasTexture, Group, Shape, Mesh, MeshLambertMaterial, PlaneGeometry, ExtrudeGeometry, Scene } from 'three'

const trackRadius = 225;
const trackWidth = 45;
const innerTrackRadius = trackRadius - trackWidth;
const outerTrackRadius = trackRadius + trackWidth;

const arcAngle1 = (1 / 3) * Math.PI;

const deltaY = Math.sin(arcAngle1) * innerTrackRadius;
const arcAngle2 = Math.asin(deltaY / outerTrackRadius);

const arcCenterX = (Math.cos(arcAngle1) * innerTrackRadius, Math.cos(arcAngle2) * outerTrackRadius) / 2;

const arcAngle3 = Math.acos(arcCenterX / innerTrackRadius);
const arcAngle4 = Math.acos(arcCenterX / outerTrackRadius);

function getBasePlaneTexture(mapWidth: number, mapHeight: number) {
    const canvas = document.createElement("canvas");
    canvas.width = mapWidth;
    canvas.height = mapHeight;
    const context = canvas.getContext("2d");

    context.fillStyle = "#546e90";
    context.fillRect(0, 0, mapWidth, mapHeight);

    context.lineWidth = 2;
    context.strokeStyle = "#e0ffff";
    context.setLineDash([10, 14])

    context.beginPath();
    context.arc(
        mapWidth / 2 - arcCenterX,
        mapHeight / 2,
        trackRadius,
        0,
        Math.PI * 2
    );

    context.stroke;

    context.beginPath()
    context.arc(
        mapWidth / 2 + arcCenterX,
        mapHeight / 2,
        trackRadius,
        0,
        Math.PI * 2
    );
    context.stroke();

    return new CanvasTexture(canvas);

}
function getLeftIsland() {
    const islandLeft = new Shape();

    islandLeft.absarc(
        -arcCenterX,
        0,
        innerTrackRadius,
        arcAngle1,
        -arcAngle1,
        false
    );

    islandLeft.absarc(
        arcCenterX,
        0,
        outerTrackRadius,
        Math.PI + arcAngle2,
        Math.PI - arcAngle2,
        true
    );

    return islandLeft;
}

function getMiddleIsland() {
    const islandMiddle = new Shape();

    islandMiddle.absarc(
        -arcCenterX,
        0,
        innerTrackRadius,
        arcAngle3,
        -arcAngle3,
        true
    );

    islandMiddle.absarc(
        arcCenterX,
        0,
        innerTrackRadius,
        Math.PI + arcAngle3,
        Math.PI - arcAngle3,
        true
    );

    return islandMiddle;
}

function getRightIsland() {
    const islandRight = new Shape();

    islandRight.absarc(
        arcCenterX,
        0,
        innerTrackRadius,
        Math.PI - arcAngle1,
        Math.PI + arcAngle1,
        true
    );

    islandRight.absarc(
        -arcCenterX,
        0,
        outerTrackRadius,
        -arcAngle2,
        arcAngle2,
        false
    );

    return islandRight;
}

function getOuterField(mapWidth: number, mapHeight: number) {
    const field = new Shape();

    field.moveTo(-mapWidth / 2, -mapHeight / 2);
    field.lineTo(0, -mapHeight / 2);

    field.absarc(-arcCenterX, 0, outerTrackRadius, -arcAngle4, arcAngle4, true);

    field.absarc(
        arcCenterX,
        0,
        outerTrackRadius,
        Math.PI - arcAngle4,
        Math.PI + arcAngle4,
        true
    );

    field.lineTo(0, -mapHeight / 2);
    field.lineTo(mapWidth / 2, -mapHeight / 2);
    field.lineTo(mapWidth / 2, mapHeight / 2);
    field.lineTo(-mapWidth / 2, mapHeight / 2);

    return field;
}

function createMap() {
    const map = new Group();
    const aspectRatio = window.innerWidth / window.innerHeight;
    const mapWidth = 960;
    const mapHeight = mapWidth / aspectRatio;

    const basePlaneTexture = getBasePlaneTexture(mapWidth, mapHeight);
    const basePlaneGeometry = new PlaneGeometry(mapWidth, mapHeight);
    const basePlaneMaterial = new MeshLambertMaterial({ map: basePlaneTexture })
    const basePlane = new Mesh(basePlaneGeometry, basePlaneMaterial);
    map.add(basePlane)

    const islandLeft = getLeftIsland();
    const islandRight = getRightIsland();
    const islandMiddle = getMiddleIsland();
    const outerField = getOuterField(mapWidth, mapHeight);

    const fieldGeometry = new ExtrudeGeometry([islandLeft, islandRight, islandMiddle, outerField])
    const fieldMesh = new Mesh(fieldGeometry, [new MeshLambertMaterial({ color: 0x67c240 }), new MeshLambertMaterial({ color: 0x23311c })])
    map.add(fieldMesh);

    return map;
}

export { createMap }
# Threejs Typescript Template

[<img src="https://raw.githubusercontent.com/winstonrc/threejs-typescript-template/github-pages/images/projectScreenshot.png" alt="Screenshot" width="533" height="300">](https://winstonrc.github.io/threejs-typescript-template/)

[Click here to view a live demo of the deployed template](https://winstonrc.github.io/threejs-typescript-template/)

This template is designed for deploying a Three.js project written in TypeScript in under a minute. It uses Webpack to bundle the source into a running project in your browser and includes quick refreshing.

It comes with examples for everything needed to create a basic scene including:

- Renderer
- Window resizer
- Camera
- Lights
- OrbitControls
- Assets: a basic cube mesh & a `.glb` model
- Model loader
- Textures
- Animation support (delta synced with the clock for consistent framerates)
- Grid and Axes helpers to visualize the canvas
- Stats module for monitoring FPS

## Installation & Usage

This project requires [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

The template can be used by clicking the [`Use this template`](https://github.com/winstonrc/threejs-typescript-template/generate) button or running the following command:
```
git clone git@github.com:winstonrc/threejs-typescript-template.git
```

To install the project run:
```
npm install
```

To build the project run:
```
npm run build
```
The default output after building is `dist/bundle.js`

To start the project run:
```
npm start
```
The server runs on [`http://localhost:9000`](http://localhost:9000) by default

## Contributing

If you notice anything not working or that you think should be added, please check the preexisting [issues](https://github.com/winstonrc/threejs-typescript-template/issues) and create a new issue if yours does not exist. Pull requests are happily accepted!

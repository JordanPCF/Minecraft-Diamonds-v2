import { createBlock } from './components/block.js';
import { createCamera} from './components/camera.js';
import { createOrbitControls } from './components/controls.js';
import { createGhostBlock } from './components/ghostBlock.js';
import { createGrid } from './components/grid.js';
import { createGUI } from './components/gui.js';
import { createAmbientLight createDirectionalLight } from './components/light.js';
import { createPlane } from './components/plane.js';
import { createPointer } from './components/pointer.js';
import { createRayCaster } from './components/rayCaster.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';

// module-scoped variables
let camera, scene, renderer;
let ambientLight, directionalLight;
let pointer, rayCaster, isShiftDown = false;

let grid, plane;
let block, ghostBlock;
let orbitControls;
let gui;

const blockSize = 50;
const planeSize = 1000;
const gridDivision = 20;

var aCube = {};
var selected;
var objects = [];


class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        ambientLight = createAmbientLight();
        directionalLight = createDirectionalLight();
        pointer = createPointer();
        rayCaster = createRayCaster();
        grid = createGrid(planeSize, gridDivision);
        plane = createPlane(planeSize);
        ghostBlock = createGhostBlock(blockSize);

        objects.push(plane);
        
        scene.add(plane);
        scene.add(grid);
        scene.add(ghostBlock);
        scene.add(ambientLight);
        scene.add(directionalLight);

        gui = createGUI();
        gui.open();

        orbitControls = createOrbitControls(camera, renderer.domElement);
        orbitControls.addEventListener('change', this.render);
        
        container.append(renderer.domElement);
    }

    render() {
        renderer.render(scene, camera);
    }
}

export { World };
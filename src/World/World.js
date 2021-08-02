import { createBlock } from './components/block.js';
import { createCamera} from './components/camera.js';
import { createGhostBlock } from './components/ghostBlock.js';
import { createGrid } from './components/grid.js';
import { createGUI } from './components/gui.js';
import { createAmbientLight, createDirectionalLight } from './components/light.js';
import { createPlane } from './components/plane.js';
import { createPointer } from './components/pointer.js';
import { createRayCaster } from './components/rayCaster.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { createOrbitControls } from './systems/controls.js';
import { listenForKeyPress } from './systems/keyPressEvents.js'

// module-scoped variables
let camera, scene, renderer;
let ambientLight, directionalLight;
let pointer, rayCaster;

let grid, plane;
let block, ghostBlock;
let orbitControls;
let gui;

const blockSize = 50;
const planeSize = 1000;
const gridDivision = 20;

var aCube = {};
var selected = {};
var objects = [];
const isKeyDown = {'shift': false};


class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        ambientLight = createAmbientLight();
        directionalLight = createDirectionalLight();
        rayCaster = createRayCaster();
        grid = createGrid(planeSize, gridDivision);
        plane = createPlane(planeSize);
        ghostBlock = createGhostBlock(blockSize);
        listenForKeyPress(isKeyDown);
        pointer = createPointer(renderer, scene, rayCaster, camera, plane, objects, ghostBlock, createBlock, selected, isKeyDown, this.render);

        aCube.xPosition = 0;
        

        objects.push(plane);
        
        scene.add(plane);
        scene.add(grid);
        scene.add(ghostBlock);
        scene.add(ambientLight);
        scene.add(directionalLight);

        gui = createGUI(aCube, selected);
        gui.open();

        orbitControls = createOrbitControls(camera, renderer.domElement);
        orbitControls.addEventListener('change', this.render);
        
        container.append(renderer.domElement);

        const resizer = new Resizer(camera, renderer);
        resizer.onResize = function () {
            this.render();
        }.bind(this);
    }

    render() {
        renderer.render(scene, camera);
    }
}

export { World };
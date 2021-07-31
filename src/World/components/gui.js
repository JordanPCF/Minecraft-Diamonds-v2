import * as THREE from '../../../vendor/three/build/three.module.js';
import { GUI } from '../../../vendor/three/examples/jsm/libs/dat.gui.module.js';

function createGUI (aCube, selected) {
    const gui = new GUI();

    gui.add(aCube, 'xPosition', 0, 100).onChange(function (e) {
        if (selected[0] instanceof THREE.Mesh) {
            selected[0].position.y = e;
        }
    });
    // gui.add( params, 'addPoint' );
    // gui.add( params, 'removePoint' );
    // gui.open();

    return gui
}

export { createGUI };
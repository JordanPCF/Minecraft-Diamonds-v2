import * as THREE from '../../../vendor/three/build/three.module.js';
import { GUI } from '../../../vendor/three/examples/jsm/libs/dat.gui.module.js';

function createGUI (aCube, selected, isBlockSelected, fn) {
    const gui = new GUI();

    gui.add(aCube, 'xPosition', 0, 100).onChange(function (e) {
        if (isBlockSelected['block']) {
            // selected[0].material.opacity = 0.4;
            selected[0].position.y = e;

            fn();
        }
    });
    // gui.add( params, 'addPoint' );
    // gui.add( params, 'removePoint' );
    // gui.open();

    return gui
}

export { createGUI };
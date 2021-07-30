import { GUI } from '../../../vendor/three/examples/jsm/libs/dat.gui.module.js';

function createGUI () {
    const gui = new GUI();

    // gui.add(aCube, 'position', 0, 100).onChange(function (e) {
        // selected.position.y = e;
        // });
    // gui.add( params, 'addPoint' );
    // gui.add( params, 'removePoint' );
    // gui.open();

    return gui
}

export { createGUI };
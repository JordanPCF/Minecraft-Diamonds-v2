import * as THREE from '../../../vendor/three/build/three.module.js';
import { GUI } from '../../../vendor/three/examples/jsm/libs/dat.gui.module.js';

function createGUI (aCube, selected, isBlockSelected, blockLength, gridDivision, fn) {
    const gui = new GUI();
    const minCoord = - gridDivision / 2;
    const maxCoord = (gridDivision / 2) - 1;

    gui.add(aCube, 'x', minCoord, maxCoord, 1).onChange(function (e) {
        if (isBlockSelected['block']) {
            selected[0].position.x = getBlockPosition(blockLength, e);

            fn();
        }
    });

    gui.add(aCube, 'y', 0, 16, 1).onChange(function (e) {
        if (isBlockSelected['block']) {
            selected[0].position.y = getBlockPosition(blockLength, e);

            fn();
        }
    });

    gui.add(aCube, 'z', minCoord, maxCoord, 1).onChange(function (e) {
        if (isBlockSelected['block']) {
            selected[0].position.z = getBlockPosition(blockLength, e);

            fn();
        }
    });

    var params = {
        Biome: "",
        Patch_Type: "",
        Patch_Area: 0,
        Patch_Center_x: 0,
        Patch_Center_z: 0
    };

    gui.add(params, "Biome");
    gui.add(params, "Patch_Type");
    gui.add(params, "Patch_Area", 0, 30, 1);
    gui.add(params, "Patch_Center_x", -10000, 10000, 1);
    gui.add(params, "Patch_Center_z", -10000, 10000, 1);

    gui.matchPositionSelectedBlock = function (selected, blockLength) {
        var x_controller = gui.__controllers[0];
        var y_controller = gui.__controllers[1];
        var z_controller = gui.__controllers[2];

        // console.log(selected[0].position.x);

        var normalizedPositionX = getNormalizedPosition(selected[0].position.x, blockLength);
        var normalizedPositionY = getNormalizedPosition(selected[0].position.y, blockLength);
        var normalizedPositionZ = getNormalizedPosition(selected[0].position.z, blockLength);

        x_controller.setValue(normalizedPositionX);
        y_controller.setValue(normalizedPositionY);
        z_controller.setValue(normalizedPositionZ);

        x_controller.updateDisplay();
        y_controller.updateDisplay();
        z_controller.updateDisplay();
    }
    return gui
}

function getBlockPosition(blockLength, factor) {
    // block position in scene
    return (blockLength/2) + (blockLength * factor);
}

function getNormalizedPosition(blockPosition, blockLength) {
    // block position in minecraft world
    return Math.floor(blockPosition / blockLength);
}

export { createGUI };
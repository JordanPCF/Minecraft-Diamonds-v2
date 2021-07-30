import * as THREE from '../../../vendor/three/build/three.module.js';

function createGrid(size, divisions) {
    const grid = new THREE.GridHelper(size, divisions);

    return grid;

}

export { createGrid };
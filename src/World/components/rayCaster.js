import * as THREE from '../../../vendor/three/build/three.module.js';

function createRayCaster() {
    const rayCaster = new THREE.Raycaster();

    return rayCaster;
}

export { createRayCaster };
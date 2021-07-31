import * as THREE from '../../../vendor/three/build/three.module.js';

function createRenderer() {
    const renderer = new THREE.WebGLRenderer( { antialias: true } );

    return renderer;
}

export { createRenderer };
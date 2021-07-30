import * as THREE from '../../../vendor/three/build/three.module.js';

function createRenderer() {
    const renderer = new THREE.WebGLRenderer();

    // renderer.setPixelRatio( window.devicePixelRatio );
    // renderer.setSize( window.innerWidth, window.innerHeight );

    return renderer;
}

export { createRenderer };
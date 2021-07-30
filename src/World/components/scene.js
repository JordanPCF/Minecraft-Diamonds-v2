import * as THREE from '../../../vendor/three/build/three.module.js';

function createScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );

    return scene;
}

export { createScene };
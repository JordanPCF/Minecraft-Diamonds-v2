import * as THREE from '../../../vendor/three/build/three.module.js';

function createAmbientLight() {
    const ambientLight = new THREE.AmbientLight( 0x606060 );

    return ambientLight;
}

function createDirectionalLight() {
    const directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 1, 0.75, 0.5 ).normalize();

    return directionalLight;
}

export { createAmbientLight, createDirectionalLight };
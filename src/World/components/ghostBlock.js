import * as THREE from '../../../vendor/three/build/three.module.js';

function createGhostBlock(size) {
    const geometry = new THREE.BoxGeometry(size, size, size);

    const material = new THREE.MeshLambertMaterial( { color: 0x949494,
                                                      opacity: 0.5,
                                                      transparent: true
                                                      } );

    const ghostBlock = new THREE.Mesh(geometry, material);

    return ghostBlock;
}

export { createGhostBlock };
import * as THREE from '../../../vendor/three/build/three.module.js';

function createBlock(size) {
    const geometry = new THREE.BoxGeometry(size, size, size);

    const material = new THREE.MeshLambertMaterial( { color: 0x0ae8f0,
                                                      map: new THREE.TextureLoader().load( '../../../assets/textures/square-outline-textured.png' ) } );

    const block = new THREE.Mesh(geometry, material);

    return block;
}

export { createBlock };
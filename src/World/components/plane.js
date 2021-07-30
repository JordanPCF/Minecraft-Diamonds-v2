import * as THREE from '../../../vendor/three/build/three.module.js';

function createPlane(size) {
    const geometry = new THREE.PlaneGeometry(size, size);
    geometry.rotateX( - Math.PI / 2 );

    const material = new THREE.MeshBasicMaterial( {visible: false});

    const plane = new THREE.Mesh(geometry, material);

    return plane;
}

export { createPlane };
import * as THREE from '../../../vendor/three/build/three.module.js';

function createCamera(planeSize) {
    const camera = new THREE.PerspectiveCamera( 45, 
                                                window.innerWidth / window.innerHeight,
                                                1,
                                                planeSize*10);
    //// Aspect ratio (currently window.innerWidth...) should be determined by 
    //// the Resizer system, see https://discoverthreejs.com/book/first-steps/world-app/
    camera.position.set( 500, 800, 1300 );
    // camera.lookAt( 0, 0, 0 );

    return camera;
}

export { createCamera };
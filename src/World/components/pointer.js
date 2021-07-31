import * as THREE from '../../../vendor/three/build/three.module.js';

function createPointer(rayCaster, camera, objects, ghostBlock, fn) {
    const pointer = new THREE.Vector2();

    document.addEventListener( 'pointermove', function (event) {
        pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
        rayCaster.setFromCamera(pointer, camera);

        const intersects = rayCaster.intersectObjects(objects);
        if (intersects.length > 0) {
            const intersect = intersects[0];

            var blockLength = ghostBlock.geometry.parameters.width;
            ghostBlock.position.copy(intersect.point).add(intersect.face.normal);
            ghostBlock.position.divideScalar(blockLength).floor().multiplyScalar(blockLength).addScalar(blockLength / 2);
        }

        fn();
    });

    return pointer;
}

export { createPointer };
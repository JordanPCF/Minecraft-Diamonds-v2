import * as THREE from '../../../vendor/three/build/three.module.js';

function createPointer(scene, rayCaster, camera, plane, objects, ghostBlock, createBlock, selected, isKeyDown, fn) {
    const pointer = new THREE.Vector2();

    var blockLength = ghostBlock.geometry.parameters.width;

    document.addEventListener('pointermove', function (event) {
        pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
        rayCaster.setFromCamera(pointer, camera);

        const intersects = rayCaster.intersectObjects(objects);
        if (intersects.length > 0) {
            const intersect = intersects[0];

            ghostBlock.position.copy(intersect.point).add(intersect.face.normal);
            ghostBlock.position.divideScalar(blockLength).floor().multiplyScalar(blockLength).addScalar(blockLength / 2);
        }

        fn();
    });

    document.addEventListener('pointerdown', function (event) {
        pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
        rayCaster.setFromCamera( pointer, camera );

        const intersects = rayCaster.intersectObjects( objects );
            if ( intersects.length > 0 ) {
                 const intersect = intersects[ 0 ];
                 selected[0] = intersect.object;

                // delete block
                if ( isKeyDown['shift'] ) {
                    if ( intersect.object !== plane ) {
                        scene.remove( intersect.object );
                        objects.splice( objects.indexOf( intersect.object ), 1 );
                    }

                } else {
                    // if selecting existing block
                    if ((intersect.object instanceof THREE.Mesh) && 
                        (intersect.object !== plane)) {
                        selected[0].material.color.setHex(0x444444);
                    }
                    else {
                    // creating block
                    const newBlock = createBlock(blockLength);
                    newBlock.position.copy( intersect.point ).add( intersect.face.normal );
                    newBlock.position.divideScalar(blockLength).floor().multiplyScalar(blockLength).addScalar(blockLength / 2);
                    // voxel.position.y = 75;
                    scene.add( newBlock );

                    objects.push( newBlock );
                    }   

                }

                fn();

            }

    });

    return pointer;
}

export { createPointer };
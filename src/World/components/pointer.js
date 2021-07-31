import * as THREE from '../../../vendor/three/build/three.module.js';

function createPointer(scene, rayCaster, camera, plane, objects, ghostBlock, createBlock, selected, isKeyDown, fn) {
    const pointer = new THREE.Vector2();
    var blockLength = ghostBlock.geometry.parameters.width;

    listenForPointerMove(pointer, rayCaster, camera, objects, ghostBlock, blockLength, fn);
    listenForPointerDown(pointer, scene, rayCaster, camera, plane, objects, createBlock, selected, isKeyDown, blockLength, fn);

    return pointer;
}

function listenForPointerMove (pointer, rayCaster, camera, objects, ghostBlock, blockLength, fn) {
    document.addEventListener('pointermove', function (event) {
        setPointerPosition(pointer, event);
        rayCaster.setFromCamera(pointer, camera);

        var intersect = getIntersectingObject(rayCaster, objects);
        if (intersect) {
            setBlockPosition(ghostBlock, blockLength, intersect);
        }

        fn();
    });
}

function listenForPointerDown (pointer, scene, rayCaster, camera, plane, objects, createBlock, selected, isKeyDown, blockLength, fn) {
    document.addEventListener('pointerdown', function (event) {
        setPointerPosition(pointer, event);
        rayCaster.setFromCamera( pointer, camera );

        var intersect = getIntersectingObject(rayCaster, objects);
        if (intersect) {
            selected[0] = intersect.object;

            if (isKeyDown['shift']) {
                deleteBlock(scene, intersect, objects, plane);
            } else {
                if (blockIsSelected(intersect, plane)) {
                    selectedBlockHandler(selected);
                } else {
                    drawBlock(scene, createBlock, blockLength, intersect, objects);
                }
            }
            fn();
        }
    });
}

function setPointerPosition(pointer, event) {
    pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
}

function setBlockPosition(block, blockLength, intersect) {
    block.position.copy(intersect.point).add(intersect.face.normal);
    block.position.divideScalar(blockLength).floor().multiplyScalar(blockLength).addScalar(blockLength / 2);
}

function getIntersectingObject(rayCaster, objects) {
    var intersect = "";
    const intersects = rayCaster.intersectObjects(objects);

    if (intersects.length > 0) {
        intersect = intersects[0];
    }

    return intersect;
}

function deleteBlock(scene, intersect, objects, plane) {
    if ( intersect.object !== plane ) {
        scene.remove( intersect.object );
        objects.splice( objects.indexOf( intersect.object ), 1 );
    }
}

function blockIsSelected(intersect, plane) {
    return (intersect.object instanceof THREE.Mesh) && 
            (intersect.object !== plane);
}

function selectedBlockHandler(selected) {
    selected[0].material.color.setHex(0x444444);
}

function drawBlock(scene, createBlock, blockLength, intersect, objects) {
    const newBlock = createBlock(blockLength);
    setBlockPosition(newBlock, blockLength, intersect);

    scene.add(newBlock);
    objects.push(newBlock);
}

export { createPointer };
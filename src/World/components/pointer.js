import * as THREE from '../../../vendor/three/build/three.module.js';

function createPointer(renderer, scene, rayCaster, camera, plane, objects, ghostBlock, createBlock, selected, isKeyDown, fn) {
    const pointer = new THREE.Vector2();
    var blockLength = ghostBlock.geometry.parameters.width;

    listenForPointerMove(pointer, scene, rayCaster, camera, objects, ghostBlock, blockLength, fn);
    listenForPointerDown(renderer, pointer, scene, rayCaster, camera, plane, objects, ghostBlock, createBlock, selected, isKeyDown, blockLength, fn);

    return pointer;
}

function listenForPointerMove (pointer, scene, rayCaster, camera, objects, ghostBlock, blockLength, fn) {
    document.addEventListener('pointermove', function (event) {
        setPointerPosition(pointer, event);
        rayCaster.setFromCamera(pointer, camera);

        var intersect = getIntersectingObject(rayCaster, objects);
        if (intersect) {
            setBlockPosition(ghostBlock, blockLength, intersect);
            scene.add(ghostBlock);
        }

        fn();
    });
}

function listenForPointerDown (renderer, pointer, scene, rayCaster, camera, plane, objects, ghostBlock, createBlock, selected, isKeyDown, blockLength, fn) {
    renderer.domElement.addEventListener('pointerdown', function (event) {
        setPointerPosition(pointer, event);
        rayCaster.setFromCamera( pointer, camera );
        setDefaultProperties(selected[0], plane);

        var intersect = getIntersectingObject(rayCaster, objects);
        if (intersect) {
            selected[0] = intersect.object;

            if (isKeyDown['shift']) {
                deleteBlock(scene, intersect, objects, plane);
            } else {
                if (blockIsSelected(intersect.object, plane)) {
                    selectedBlockHandler(scene, selected);
                } else {
                    drawBlock(scene, createBlock, ghostBlock, blockLength, intersect, objects, fn);
                    // setDefaultProperties(selected[0], plane);
                }
            }
        }
        fn();
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

function blockIsSelected(object, plane) {
    return (object instanceof THREE.Mesh) && 
            (object !== plane);
}

function selectedBlockHandler(scene, selected) {
    highlightBlock(selected[0]);
}

function highlightBlock(selected) {
    selected.material.opacity = 0.4;
}

function drawBlock(scene, createBlock, ghostBlock, blockLength, intersect, objects, fn) {
    createBlock(blockLength)
    .then(function (newBlock) {
        setBlockPosition(newBlock, blockLength, intersect);
        scene.add(newBlock);
        scene.remove(ghostBlock);
        objects.push(newBlock);

        fn();
    })
}

function setDefaultProperties(object, plane) {
    // sets opacity of previousy selected block back to 1 to appear unselected
    if (blockIsSelected(object, plane)) {
        object.material.opacity = 1;
    }
}

export { createPointer };
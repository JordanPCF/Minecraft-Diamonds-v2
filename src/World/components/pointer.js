import * as THREE from '../../../vendor/three/build/three.module.js';

function createPointer(renderer, scene, rayCaster, camera, plane, objects, ghostBlock, createBlock, selected, isKeyDown, isBlockSelected, fn) {
    const pointer = new THREE.Vector2();
    var blockLength = ghostBlock.geometry.parameters.width;

    listenForPointerMove(pointer, scene, rayCaster, camera, objects, ghostBlock, blockLength, isBlockSelected, fn);
    listenForPointerDown(renderer, pointer, scene, rayCaster, camera, plane, objects, ghostBlock, createBlock, selected, isKeyDown, blockLength, isBlockSelected, fn);

    return pointer;
}

function listenForPointerMove (pointer, scene, rayCaster, camera, objects, ghostBlock, blockLength, isBlockSelected, fn) {
    document.addEventListener('pointermove', function (event) {
        // only draw ghost block if another block is not selected
        if (!(isBlockSelected['block'])) {
            setPointerPosition(pointer, event);
            rayCaster.setFromCamera(pointer, camera);

            var intersect = getIntersectingObject(rayCaster, objects);
            if (intersect) {
                setBlockPosition(ghostBlock, blockLength, intersect);
                scene.add(ghostBlock);
                document.getElementById('x').innerHTML = 'x: ' + ghostBlock.position.x;
                document.getElementById('y').innerHTML = 'y: ' + ghostBlock.position.y;
                document.getElementById('z').innerHTML = 'z: ' + ghostBlock.position.z;
            } else {
                scene.remove(ghostBlock);
            }
            fn();
        }
    });
}

function listenForPointerDown (renderer, pointer, scene, rayCaster, camera, plane, objects, ghostBlock, createBlock, selected, isKeyDown, blockLength, isBlockSelected, fn) {
    renderer.domElement.addEventListener('pointerdown', function (event) {
        scene.remove(ghostBlock);
        setPointerPosition(pointer, event);
        rayCaster.setFromCamera( pointer, camera );
        setDefaultProperties(selected[0], plane, isBlockSelected);

        var intersect = getIntersectingObject(rayCaster, objects);
        if (intersect) {
            selected[0] = intersect.object;

            if (isKeyDown['shift']) {
                deleteBlock(scene, intersect, objects, plane);
            } else {
                if (checkBlockIsSelected(intersect.object, plane, isBlockSelected)) {
                    selectedBlockHandler(scene, selected);
                } else {
                    drawBlock(scene, createBlock, ghostBlock, blockLength, intersect, objects, isBlockSelected, fn);
                }
            }
        }else {
            isBlockSelected['block'] = false;
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

function checkBlockIsSelected(object, plane, isBlockSelected) {
    if ((object instanceof THREE.Mesh) && (object !== plane)) {
        isBlockSelected['block'] = true;
        return true;
    } else {
        return false;
    }
}

function selectedBlockHandler(scene, selected) {
    highlightBlock(selected[0]);
}

function highlightBlock(selected) {
    selected.material.opacity = 0.4;
}

function drawBlock(scene, createBlock, ghostBlock, blockLength, intersect, objects, isBlockSelected, fn) {
    isBlockSelected['block'] = false;
    createBlock(blockLength)
    .then(function (newBlock) {
        setBlockPosition(newBlock, blockLength, intersect);
        scene.add(newBlock);
        scene.remove(ghostBlock);
        objects.push(newBlock);

        fn();
    })
}

function setDefaultProperties(object, plane, isBlockSelected) {
    // sets opacity of previousy selected block back to 1 to appear unselected
    if (checkBlockIsSelected(object, plane, isBlockSelected)) {
        object.material.opacity = 1;
    }
}

export { createPointer };
import * as THREE from '../../../vendor/three/build/three.module.js';

function createPointer(renderer, scene, rayCaster, camera, plane, objects, ghostBlock, createBlock, blockLength, selected, isKeyDown, isBlockSelected, gui, fn) {
    const pointer = new THREE.Vector2();

    listenForPointerMove(pointer, scene, rayCaster, camera, objects, ghostBlock, blockLength, isBlockSelected, gui, fn);
    listenForPointerDown(renderer, pointer, scene, rayCaster, camera, plane, objects, ghostBlock, createBlock, selected, isKeyDown, blockLength, isBlockSelected, gui, fn);

    return pointer;
}

function listenForPointerMove (pointer, scene, rayCaster, camera, objects, ghostBlock, blockLength, isBlockSelected, gui, fn) {
    document.addEventListener('pointermove', function (event) {
        // only draw ghost block if another block is not selected
        if (!(isBlockSelected['block'])) {
            setPointerPosition(pointer, event);
            rayCaster.setFromCamera(pointer, camera);
            gui.close()

            var intersect = getIntersectingObject(rayCaster, objects);
            if (intersect) {
                setBlockPosition(ghostBlock, blockLength, intersect);
                scene.add(ghostBlock);
                updateCoordinates(ghostBlock, blockLength);
            } else {
                scene.remove(ghostBlock);
                showCoordinates(false);
            }
            fn();
        }
    });
}

function listenForPointerDown (renderer, pointer, scene, rayCaster, camera, plane, objects, ghostBlock, createBlock, selected, isKeyDown, blockLength, isBlockSelected, gui, fn) {
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
                    selectedBlockHandler(scene, selected, gui, blockLength);
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

function selectedBlockHandler(scene, selected, gui, blockLength) {
    highlightBlock(selected);
    gui.matchPositionSelectedBlock(selected, blockLength);
    gui.open();

    // showCoordinates(false);
    
}

function showCoordinates(truth) {
    var coordinatesDOM = document.getElementsByClassName("coordinates");
    Array.prototype.forEach.call(coordinatesDOM, function (item) {
        if (truth) {
            item.style.visibility = "visible";
        } else {
            item.style.visibility = "hidden";
        }
    });
}

function highlightBlock(selected) {
    selected[0].material.opacity = 0.4;
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

function updateCoordinates(ghostBlock, blockLength) {
    // shows the user the coordinates of the ghost block
    var xpos = Math.floor(ghostBlock.position.x / blockLength) + parseInt(window.sessionStorage['map_x']);
    var ypos = Math.floor(ghostBlock.position.y / blockLength);
    var zpos = -1 * (Math.floor(ghostBlock.position.z / blockLength) + parseInt(window.sessionStorage['map_z']));
    document.getElementById('x').innerHTML = 'x: ' + xpos;
    document.getElementById('y').innerHTML = 'y: ' + ypos;
    document.getElementById('z').innerHTML = 'z: ' + zpos;

    showCoordinates(true);
}

export { createPointer };
import * as THREE from '../../../vendor/three/build/three.module.js';

function createBlock(size) {
    const geometry = new THREE.BoxGeometry(size, size, size);

    return loadTexture()
           .then(function (result) {
                result.color.setHex(0x0ae8f0);

                const block = new THREE.Mesh(geometry, result);
                return promiseResolvedWith(block);
            })
}

function loadTexture () {
    return new Promise(function (resolve, reject) {
        const loader = new THREE.TextureLoader();
        loader.load('../../../assets/textures/square-outline-textured.png',
                    function (texture) {
                        const material = new THREE.MeshLambertMaterial({
                            map: texture
                            });

                        resolve(material);
                    })
    });
}

function promiseResolvedWith(value) {
    var promise = new Promise(function (resolve, reject) {
        resolve(value);
    });
    return promise;
}

export { createBlock };
const setSize = function (camera, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    // camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    // renderer.setSize(container.clientWidth, container.clientHeight);
}

class Resizer {
    constructor(camera, renderer) {
        // set initial size on load
        setSize(camera, renderer);

        window.addEventListener('resize', function () {
            setSize(camera, renderer);
            this.onResize(); // using hooks instead of World.render
        });

    }

    onResize() {} // empty method that can be customized from outside the Resizer class
}

export { Resizer };
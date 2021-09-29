

function transformCoordinates(coord_pairs) {
    // coord_pairs is a set of {x:z}
    return new Promise(function (resolve, reject) {
        var transformed_pairs = new Set();

        coord_pairs.forEach(function (pair) {
            var world_x = parseInt(Object.keys(pair)[0]);
            var world_z = parseInt(pair[world_x]);

            var grid_x = _world_to_grid_transformation(world_x);
            var grid_z = _world_to_grid_transformation(world_z);

            var pair_string = String(grid_x) + ', ' + String(grid_z);

            transformed_pairs.add(pair_string);
        })

        resolve(transformed_pairs);
    });
}

function _world_to_grid_transformation(coord) {
    var square_num = Math.floor((coord + 5000 - 100) / 100);
    var transformed = (square_num * window.sessionStorage['square width']) + 1;

    return transformed;
    
}

function grid_to_world_transformation(coord) {
    coord = parseInt(coord);
    var square_num = (coord - 1) / window.sessionStorage['square width'];
    var transformed = (square_num * 100) + 100 - 5000;

    return transformed;

}



export { grid_to_world_transformation, transformCoordinates };

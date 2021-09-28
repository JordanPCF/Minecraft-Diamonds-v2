function get_world_coordinates(x, y, square_width) {
    var transformed_x = _grid_to_world_transformation(x, square_width);
    var transformed_z = _grid_to_world_transformation(y, square_width);

    return String

}

function grid_to_world_transformation(coord) {
    var square_num = (coord - 1) / window.sessionStorage['square width'];
    var transformed = (square_num * 100) + 100 - 5000;

    return transformed;

}

export { grid_to_world_transformation };

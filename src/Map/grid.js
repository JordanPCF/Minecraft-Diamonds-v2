// grid code from https://bl.ocks.org/cagrimmett/07f8c8daea00946b9e704e3efcbd5739
import { grid_to_world_transformation } from './coordinate_system.js';

const grid_coord_min = -50;
const grid_coord_max = 50;
const map_coord_min = -5000;
const map_coord_max = 5000;

const map_width = 950;
const map_height = 950;

var square_width = map_width / (2*grid_coord_max);
window.sessionStorage['square width'] = square_width;

var diamond_positions = new Set(['1, 1']);


function buildGrid(db, diamonds) {
    var gridData = _gridData(diamonds);  
    console.log(gridData);

    var grid = d3.select("#grid")
        .append("svg")
        .attr("width",map_width)
        .attr("height",map_height);
        
    var row = grid.selectAll(".row")
        .data(gridData)
        .enter().append("g")
        .attr("class", "row");
        
    var column = row.selectAll(".square")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("class","square")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; })
        .style("fill", function(d) { return d.color; })
        .style("stroke", "#222")
        .on('mouseover', function(d) {
            // highlight square as red
           d3.select(this).style("fill",'rgba(255, 0, 0, 1)');

           _updateCoordinates(d.x, d.y);

        })
        .on('mouseout', function (d) {
            d3.select(this).style("fill", 'rgba(255, 255, 255, 0.1');
        })
        .on('click', function (d) {
            window.sessionStorage['map_x'] = grid_to_world_transformation(d.x);
            window.sessionStorage['map_z'] = grid_to_world_transformation(d.y);
            window.location ='./world.html';
        });
}


function _gridData(diamonds) {
    console.log(diamonds)
    var data = new Array();
    var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    var ypos = 1;
    var width = square_width;
    var height = square_width;
    var click = 0;
    
    // iterate for rows 
    for (var row = 0; row < 2*grid_coord_max; row++) {
        data.push( new Array() );
        
        // iterate for cells/columns inside rows
        for (var column = 0; column < 2*grid_coord_max; column++) {
            let color;
            var this_position = String(xpos) + ', ' + String(ypos);

            if (diamonds.has(this_position)) {
                console.log('Diamond at ', this_position)
                color = 'rgba(0, 255, 255, 1)';
            } else {
                color = 'rgba(255, 255, 255, 0.1)';
            }
            data[row].push({
                x: xpos,
                y: ypos,
                width: width,
                height: height,
                color: color
            })
            // increment the x position. I.e. move it over by 50 (width variable)
            xpos += width;
        }
        // reset the x position after a row is complete
        xpos = 1;
        // increment the y position for the next row. Move it down 50 (height variable)
        ypos += height; 
    }
    return data;
}

function _updateCoordinates(x, z) {
    var world_x = String(grid_to_world_transformation(x));
    var world_z = String(-1* grid_to_world_transformation(z));

    document.getElementById('x').innerHTML = 'x: ' + world_x;
    document.getElementById('z').innerHTML = 'z: ' + world_z;
}

export { buildGrid };

import { World } from './World.js';
import { Database } from '../Database/database.js';
import { Dashboard } from '../Dashboard/dashboard.js';

// const db_name = 'DiamondLocations';
// window.localStorage['db_name'] = db_name;
const db_name = window.localStorage['db_name'];


function build_world() {
    const container = document.querySelector('#scene-container');

    const world = new World(container);
    const db = new Database(db_name)

    promise_chain(db, world);    
}

function promise_chain(db, world) {
    var promise = db.setUpDB.bind(db)();

    promise.then(result => {
        world.render()
    })
}


build_world();
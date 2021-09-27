import { World } from './World/World.js';
import { Database } from './Database/database.js';
import { Dashboard } from './Dashboard/dashboard.js';

const db_name = 'DiamondLocations';
window.localStorage['db_name'] = db_name;


function main() {
    const container = document.querySelector('#scene-container');

    const world = new World(container);
    const db = new Database(db_name)

    promise_chain(db);    
    world.render();
}

function promise_chain(db) {
    var promise = db.setUpDB.bind(db)();

    promise.then(result => {
        var dash = new Dashboard(db);
        // window.dash = dash;
        // window.localStorage.setItem('dash', [dash]);
           // .then(result => {
           //          return result.make_queries.bind(result)()})
           // .then(result => {
           //          console.log(result)})

    })
}


main();


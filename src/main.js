import { World } from './World/World.js';
import { Database } from './Database/database.js';
import { Dashboard } from './Dashboard/dashboard.js';

function main() {
    const container = document.querySelector('#scene-container');

    const world = new World(container);
    const db = new Database('DiamondLocations')

    promise_chain(db);    
    world.render();
}

function promise_chain(db) {
    var promise = db.setUpDB.bind(db)();

    promise.then(result => {
                    return new Dashboard(db)});
           // .then(result => {
           //          return result.make_queries.bind(result)()})
           // .then(result => {
           //          console.log(result)})

}

main();


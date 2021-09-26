import { World } from './World/World.js';
import { Database } from './Database/database.js';
import { Dashboard } from './Dashboard/dashboard.js';

function main() {
    const container = document.querySelector('#scene-container');

    const world = new World(container);
    const db = new Database('DiamondLocations')
    db.setUpDB.bind(db)();

    const dash = new Dashboard(db)
    console.log(dash.get_query_results());

    world.render();
}

main();


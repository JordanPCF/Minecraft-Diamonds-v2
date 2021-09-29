import { buildGrid } from './Map/grid.js';
import { Database } from './Database/database.js';
import { transformCoordinates} from './Map/coordinate_system.js';

const db_name = 'DiamondLocations';
window.localStorage['db_name'] = db_name;


function main() {
    const db = new Database(db_name)

    promise_chain(db);    
}

function promise_chain(db) {
    var promise = db.setUpDB.bind(db)();

    promise.then(result => {
        return db.scan_all_diamonds();
    })
    .then(result => {
        return transformCoordinates(result);
    })
    .then(result => {
        buildGrid(db, result);
    })
}


main();


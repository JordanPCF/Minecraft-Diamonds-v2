import { Database } from '../Database/database.js';
import { Dashboard } from './dashboard.js'

var db_name = window.localStorage['db_name']
var db = new Database(db_name);
var dashboard = new Dashboard(db);

dashboard.assemble_dashboard();